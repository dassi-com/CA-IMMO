import crypto from "crypto";
import { Prisma, PaymentStatus } from "@prisma/client";
import { prisma } from "../../utils/prisma";
import { AppError } from "../../middlewares/error.middleware";
import { env } from "../../config/env";
import {
  initiateFlutterwavePayment,
  verifyFlutterwaveTransaction,
} from "../../config/flutterwave";
import {
  InitiatePaymentDto,
  FlutterwaveWebhookDto,
  PaymentsListQuery,
} from "./payments.types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const paymentInclude = {
  owner: {
    select: {
      id: true,
      full_name: true,
      email: true,
      phone: true,
    },
  },
  property: {
    select: {
      id: true,
      title: true,
      city: true,
      neighborhood: true,
      status: true,
      is_featured: true,
    },
  },
};

// Générer une référence de transaction unique
const generateTxRef = (): string => {
  return `IMMO-${Date.now()}-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
};

// ─── Services ─────────────────────────────────────────────────────────────────

export const initiatePaymentService = async (
  ownerId: string,
  dto: InitiatePaymentDto
) => {
  // Vérifier que la propriété existe et appartient à l'owner
  const property = await prisma.property.findUnique({
    where: { id: dto.property_id, is_deleted: false },
    include: {
      owner: {
        select: {
          id: true,
          full_name: true,
          email: true,
          phone: true,
        },
      },
    },
  });

  if (!property) {
    throw new AppError("Property not found", 404);
  }

  if (property.owner_id !== ownerId) {
    throw new AppError(
      "You are not allowed to make a payment for this property",
      403
    );
  }

  if (property.status !== "APPROVED") {
    throw new AppError(
      "Only approved properties can be featured",
      400
    );
  }

  if (property.is_featured) {
    throw new AppError("Property is already featured", 409);
  }

  // Vérifier qu'il n'y a pas un paiement PENDING en cours
  const pendingPayment = await prisma.payment.findFirst({
    where: {
      property_id: dto.property_id,
      owner_id: ownerId,
      status: "PENDING",
    },
  });

  if (pendingPayment) {
    throw new AppError(
      "A payment is already pending for this property",
      409
    );
  }

  const txRef = generateTxRef();

  // Créer le paiement en base (status PENDING)
  const payment = await prisma.payment.create({
    data: {
      owner_id: ownerId,
      property_id: dto.property_id,
      amount: dto.amount,
      currency: dto.currency ?? "XOF",
      status: "PENDING",
      type: "FEATURED",
      flutterwave_ref: txRef,
    },
    include: paymentInclude,
  });

  // Initier le paiement Flutterwave
  const { payment_link } = await initiateFlutterwavePayment({
    tx_ref: txRef,
    amount: dto.amount,
    currency: dto.currency ?? "XOF",
    payment_options: "mobilemoney",
    customer: {
      email: property.owner.email,
      phonenumber: dto.phone_number,
      name: property.owner.full_name,
    },
    meta: {
      property_id: dto.property_id,
      owner_id: ownerId,
      payment_db_id: payment.id,
    },
    customizations: {
      title: "Mise en avant de propriété",
      description: `Mise en avant de : ${property.title}`,
    },
  });

  return {
    payment,
    payment_link,
  };
};

export const handleWebhookService = async (
  payload: FlutterwaveWebhookDto,
  signature: string
): Promise<void> => {
  // Vérifier la signature du webhook
  const hash = crypto
    .createHmac("sha256", env.flutterwave.secretKey)
    .update(JSON.stringify(payload))
    .digest("hex");

  if (hash !== signature) {
    throw new AppError("Invalid webhook signature", 401);
  }

  if (payload.event !== "charge.completed") {
    return; // Ignorer les autres événements
  }

  const { tx_ref, status } = payload.data;

  // Trouver le paiement correspondant
  const payment = await prisma.payment.findUnique({
    where: { flutterwave_ref: tx_ref },
  });

  if (!payment) {
    throw new AppError("Payment not found", 404);
  }

  if (payment.status !== "PENDING") {
    return; // Déjà traité — idempotence
  }

  if (status === "successful") {
    // Vérifier la transaction côté Flutterwave
    const verified = await verifyFlutterwaveTransaction(
      String(payload.data.id)
    );

    if (verified.status !== "successful") {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: "FAILED" },
      });
      return;
    }

    // Tout est OK — confirmer le paiement et activer le featured
    await prisma.$transaction([
      prisma.payment.update({
        where: { id: payment.id },
        data: { status: "CONFIRMED" },
      }),
      prisma.property.update({
        where: { id: payment.property_id },
        data: { is_featured: true },
      }),
    ]);
  } else {
    // Paiement échoué
    await prisma.payment.update({
      where: { id: payment.id },
      data: { status: "FAILED" },
    });
  }
};

export const confirmPaymentManuallyService = async (
  paymentId: string
): Promise<typeof paymentInclude & { id: string }> => {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: paymentInclude,
  });

  if (!payment) {
    throw new AppError("Payment not found", 404);
  }

  if (payment.status === "CONFIRMED") {
    throw new AppError("Payment is already confirmed", 409);
  }

  if (payment.status === "FAILED") {
    throw new AppError("Cannot confirm a failed payment", 400);
  }

  // Confirmer manuellement + activer featured
  const [updatedPayment] = await prisma.$transaction([
    prisma.payment.update({
      where: { id: paymentId },
      data: { status: "CONFIRMED" },
      include: paymentInclude,
    }),
    prisma.property.update({
      where: { id: payment.property_id },
      data: { is_featured: true },
    }),
  ]);

  return updatedPayment as any;
};

export const getMyPaymentsService = async (
  ownerId: string,
  query: PaymentsListQuery
) => {
  const page = Math.max(1, parseInt(query.page ?? "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(query.limit ?? "10", 10)));
  const skip = (page - 1) * limit;

  const where: Prisma.PaymentWhereInput = {
    owner_id: ownerId,
  };

  if (query.status) {
    where.status = query.status as PaymentStatus;
  }

  if (query.property_id) {
    where.property_id = query.property_id;
  }

  const [total, payments] = await Promise.all([
    prisma.payment.count({ where }),
    prisma.payment.findMany({
      where,
      skip,
      take: limit,
      orderBy: { created_at: "desc" },
      include: paymentInclude,
    }),
  ]);

  return {
    payments,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const listPaymentsService = async (query: PaymentsListQuery) => {
  const page = Math.max(1, parseInt(query.page ?? "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(query.limit ?? "10", 10)));
  const skip = (page - 1) * limit;

  const where: Prisma.PaymentWhereInput = {};

  if (query.status) {
    where.status = query.status as PaymentStatus;
  }

  if (query.property_id) {
    where.property_id = query.property_id;
  }

  const [total, payments] = await Promise.all([
    prisma.payment.count({ where }),
    prisma.payment.findMany({
      where,
      skip,
      take: limit,
      orderBy: { created_at: "desc" },
      include: paymentInclude,
    }),
  ]);

  return {
    payments,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getPaymentService = async (
  paymentId: string,
  requesterId: string,
  requesterRole: string
) => {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: paymentInclude,
  });

  if (!payment) {
    throw new AppError("Payment not found", 404);
  }

  // Un owner ne peut voir que ses propres paiements
  if (requesterRole === "OWNER" && payment.owner_id !== requesterId) {
    throw new AppError("You are not allowed to view this payment", 403);
  }

  return payment;
};