'use client';

import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  'w-full rounded-xl border border-border bg-monabris-background px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      state: {
        default: '',
        error: 'border-error focus:border-error focus:ring-error/20',
        success: 'border-success focus:border-success focus:ring-success/20',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, state, ...props }, ref) => (
    <input ref={ref} className={inputVariants({ state, className })} {...props} />
  )
);
Input.displayName = 'Input';

export { Input, inputVariants };