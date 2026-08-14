'use client';

import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap transition-colors',
  {
    variants: {
      variant: {
        // Badges : fond rouge ou noir, texte blanc
        primary: 'bg-primary-600 text-white',
        dark: 'bg-secondary text-white',
        accent: 'bg-accent-400 text-black',
        success: 'bg-success/10 text-success',
        warning: 'bg-warning/10 text-warning',
        error: 'bg-error/10 text-error',
        neutral: 'bg-gray-100 text-gray-600',
        outline: 'border border-border text-gray-600 bg-surface',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={badgeVariants({ variant, className })} {...props} />
  )
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };