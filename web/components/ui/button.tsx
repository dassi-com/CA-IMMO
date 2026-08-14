'use client';

import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

// class-variance-authority is a lightweight utility — check availability
import { Slot } from '@radix-ui/react-slot';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        // Primaire : fond rouge, texte blanc
        primary: 'bg-primary-600 text-white shadow-card hover:bg-primary-700 hover:shadow-card-hover',
        // Secondaire : transparent, bordure rouge, texte rouge
        secondary: 'bg-transparent text-primary-600 border border-primary-600 hover:bg-primary-50',
        // Tertiaire : fond noir, texte blanc
        tertiary: 'bg-secondary text-white shadow-card hover:bg-gray-800 hover:shadow-card-hover',
        // Accent : fond or, texte noir
        accent: 'bg-accent-400 text-black hover:bg-accent-500',
        // Ghost : transparent
        ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900',
        // White : fond blanc (pour surfaces rouges/sombres)
        white: 'bg-white text-primary-600 shadow-card hover:bg-gray-100',
      },
      size: {
        sm: 'h-9 px-3.5 text-xs',
        md: 'h-11 px-5',
        lg: 'h-12 px-7 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={buttonVariants({ variant, size, className })} ref={ref} {...props} />;
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };