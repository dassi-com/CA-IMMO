'use client';

import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

// Tags : fond #FFCACA, texte #E80505 (charte MONABRIS)
const tagVariants = cva(
  'inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium whitespace-nowrap transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary-200 text-primary-600',
        primary: 'bg-primary-600 text-white',
        light: 'bg-primary-50 text-primary-600',
        dark: 'bg-secondary text-white',
        neutral: 'bg-gray-100 text-gray-600',
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