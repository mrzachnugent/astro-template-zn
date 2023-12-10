import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import * as React from 'react';
import autoAnimate from '@formkit/auto-animate';

export const FormField = React.forwardRef<
  HTMLDivElement,
  Omit<React.HTMLAttributes<HTMLDivElement>, 'id'> & {
    htmlFor: string;
    label: React.ReactNode;
    labelProps?: Omit<
      React.ComponentPropsWithoutRef<typeof Label>,
      'htmlFor' | 'children'
    >;
    messageProps?: React.HTMLAttributes<HTMLParagraphElement>;
    errors?: Partial<Record<string, string[]>>;
  }
>(
  (
    {
      className,
      children,
      label,
      labelProps,
      htmlFor,
      errors,
      messageProps,
      ...props
    },
    ref
  ) => {
    const id = React.useId();
    const error = getError(htmlFor, errors);

    return (
      <div
        id={id}
        ref={(innerRef) => {
          innerRef && autoAnimate(innerRef);
          return ref;
        }}
        className={cn('space-y-2', className)}
        {...props}
      >
        <Label
          htmlFor='htmlFor'
          className={cn(!!error && 'text-destructive', labelProps?.className)}
          {...labelProps}
        >
          {label}
        </Label>
        {children}
        {!!error && (
          <p
            className={cn('text-sm text-destructive', messageProps?.className)}
            {...messageProps}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);
FormField.displayName = 'FormField';

function getError(htmlFor: string, errors?: Partial<Record<string, string[]>>) {
  if (!errors) return null;
  const errorsFor = errors[htmlFor];
  return errorsFor && errorsFor.length > 0 ? errorsFor[0] : null;
}
