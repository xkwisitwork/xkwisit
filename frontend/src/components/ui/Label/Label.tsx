import { forwardRef, type LabelHTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  /** Renders an asterisk after the label text. */
  required?: boolean;
  /** Optional helper text rendered under the label text. */
  hint?: string;
  /** Appends a small icon or badge after the label text. */
  trailing?: ReactNode;
};

/**
 * Standalone label element.
 * Prefer the `label` prop on `Input`/`Textarea`/`Select` when possible -
 * this primitive exists for cases where the label must live outside the field.
 *
 * @example
 * <Label htmlFor="email" required hint="We never share your email.">
 * Email address
 * </Label>
 * <input id="email" type="email" />
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { className, children, required, hint, trailing, ...props },
  ref,
) {
  return (
    <div className="space-y-1">
      <label
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 text-300 font-medium text-foreground",
          props.htmlFor ? "cursor-pointer" : "cursor-default",
          className,
        )}
        {...props}
      >
        <span>
          {children}
          {required ? (
            <span aria-hidden="true" className="ml-0.5 text-destructive">
              *
            </span>
          ) : null}
        </span>
        {trailing ? <span className="shrink-0">{trailing}</span> : null}
      </label>

      {hint ? <p className="text-200 text-neutral-600">{hint}</p> : null}
    </div>
  );
});

Label.displayName = "Label";
