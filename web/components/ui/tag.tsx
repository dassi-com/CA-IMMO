'use client';

import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

// Tags : fond gris chaud, texte graphite
const tagVariants = cva(
  'inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium whitespace-nowrap transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-warm text-gray-600',
        primary: 'bg-primary-50 text-primary-700',
        accent: 'bg-accent-50 text-accent-800',
        dark: 'bg-gray-900 text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {}

const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={tagVariants({ variant, className })} {...props} />
  )
);
Tag.displayName = 'Tag';

export { Tag, tagVariants };