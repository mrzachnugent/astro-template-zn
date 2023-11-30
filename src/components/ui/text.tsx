import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const textVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
});

const COMPONENT_FROM_VARIANT = {
  p: 'p',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  code: 'code',
  lead: 'p',
  large: 'p',
  small: 'p',
  muted: 'p',
} as const;

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement | HTMLHeadingElement>,
    VariantProps<typeof textVariants> {}

const Text = React.forwardRef<
  HTMLParagraphElement | HTMLHeadingElement,
  TextProps
>(({ className, variant = 'p', ...props }, ref) => {
  const Comp = COMPONENT_FROM_VARIANT[variant ?? 'p'];
  return (
    <Comp
      className={cn(textVariants({ variant, className }))}
      ref={ref}
      {...props}
    />
  );
});
Text.displayName = 'Text';

export { Text, textVariants };
