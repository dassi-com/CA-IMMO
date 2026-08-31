# 🏠 CentralAfricaHomes

> Plateforme immobilière innovante pour l'Afrique centrale

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.0-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-316192?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render)](https://render.com/)

---

## 📖 À propos

**CentralAfricaHomes** est une plateforme immobilière complète dédiée aux pays d'Afrique centrale (Gabon, Cameroun, Congo, Guinée équatoriale). Elle met en relation les propriétaires, les agents immobiliers et les locataires/acheteurs dans une région où l'accès à l'information immobilière est encore limité.

### 🎯 Objectifs

- ✅ **Faciliter l'accès** à l'information immobilière en Afrique centrale
- ✅ **Mettre en confiance** les utilisateurs grâce à un système de vérification des annonces
- ✅ **Simplifier la mise en relation** entre propriétaires et locataires/acheteurs
- ✅ **Offrir une expérience moderne** avec paiement sécurisé pour les mises en avant

---

## 🚀 Démo en ligne

🔗 **Frontend (Vercel) :** [https://immo-eqap.onrender.com](https://immo-eqap.onrender.com)

📦 **Backend (Render) :** [https://immo-eqap.onrender.com](https://immo-eqap.onrender.com)

---

## ✨ Fonctionnalités

### 🔐 Authentification & Autorisation
- Inscription et connexion sécurisées
- Gestion des rôles : **Admin**, **Propriétaire (Owner)**, **Locataire (Tenant)**
- JWT avec refresh tokens
- Protection des routes par rôle

### 🏡 Gestion des annonces
- Création, modification, suppression d'annonces
- Upload d'images vers Cloudinary
- Système de validation par l'admin (PENDING → APPROVED / REJECTED)
- Mise en avant des annonces (FEATURED) avec paiement Flutterwave

### ❤️ Favoris
- Sauvegarder ses propriétés préférées
- Synchronisation entre appareils
- Notifications de changement de prix

### 🔍 Recherche avancée
- Filtres par ville, type de bien, prix, surface, etc.
- Recherche en temps réel
- Résultats optimisés avec pagination

### 📊 Dashboards personnalisés

#### Admin
- 📈 Statistiques globales (utilisateurs, annonces, revenus)
- ✅ Validation des annonces en attente
- 👥 Gestion des utilisateurs (rôles, suspension)
- 💰 Suivi des paiements et demandes de mise en avant

#### Propriétaire (Agent)
- 📊 Performance des annonces (vues, contacts)
- 🏠 Gestion de ses biens (CRUD)
- ⭐ Mise en avant des annonces (paiement Flutterwave)
- 📩 Gestion des demandes de visite

#### Locataire (Tenant)
- ❤️ Suivi des favoris
- 🔔 Alertes de prix
- 📅 Gestion des visites
- 📩 Messages avec les agents

### 💳 Système de paiement
- Intégration **Flutterwave** pour les mises en avant
- Webhooks pour la confirmation des paiements
- Historique des transactions

### 🔔 Notifications en temps réel
- Notifications Socket.io
- Alertes de changement de statut
- Messages instantanés

---

## 🛠️ Stack Technique

### Frontend
| Technologie | Version | Utilisation |
|-------------|---------|-------------|
| [Next.js](https://nextjs.org/) | 14.x | Framework React (App Router) |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Typage statique |
| [Tailwind CSS](https://tailwindcss.com/) | 3.x | Styling et design |
| [React Hook Form](https://react-hook-form.com/) | 7.x | Gestion des formulaires |
| [Zod](https://zod.dev/) | 3.x | Validation des données |
| [Framer Motion](https://www.framer.com/motion/) | 10.x | Animations |
| [Lucide React](https://lucide.dev/) | - | Icônes |
| [Axios](https://axios-http.com/) | - | Requêtes HTTP |
| [React Query](https://tanstack.com/query) | 5.x | Gestion d'état serveur |

### Backend
| Technologie | Version | Utilisation |
|-------------|---------|-------------|
| [Node.js](https://nodejs.org/) | 18.x | Runtime |
| [Express](https://expressjs.com/) | 4.x | Framework API |
| [Prisma](https://www.prisma.io/) | 5.x | ORM |
| [PostgreSQL](https://www.postgresql.org/) | 15.x | Base de données |
| [JWT](https://jwt.io/) | - | Authentification |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | - | Hachage des mots de passe |
| [Cloudinary](https://cloudinary.com/) | - | Stockage d'images |
| [Flutterwave](https://flutterwave.com/) | - | Paiements |
| [Socket.io](https://socket.io/) | - | Notifications temps réel |

### Base de données (Supabase)
- **PostgreSQL** hébergé sur **Supabase**
- **Prisma** pour les migrations et requêtes
- **Row Level Security (RLS)** pour la sécurité

### DevOps & Hébergement
| Service | Utilisation |
|---------|-------------|
| [Vercel](https://vercel.com/) | Hébergement frontend |
| [Render](https://render.com/) | Hébergement backend |
| [Supabase](https://supabase.com/) | Base de données |
| [GitHub](https://github.com/) | Versionnement et CI/CD |

