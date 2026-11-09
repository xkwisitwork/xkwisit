import { cva, type VariantProps } from "class-variance-authority";

/**
 * Button style variants.
 * Centralises every visual permutation of the Button primitive so that
 * `Button.tsx`, `IconButton.tsx`, and `ButtonGroup.tsx` all share one source.
 */

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap font-medium select-none",
    "rounded-full transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98]",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        contained:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary-500 hover:shadow-md",
        outlined:
          "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        text: "bg-transparent text-primary hover:bg-primary/5",
        ghost: "bg-transparent text-foreground hover:bg-muted",
        subtle: "bg-muted text-foreground hover:bg-muted/80",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        success: "bg-success text-success-foreground shadow-sm hover:bg-success/90",
        link: "bg-transparent text-primary underline-offset-4 hover:underline p-0 h-auto rounded-none",
      },
      size: {
        sm: "h-8 px-3 text-300",
        md: "h-10 px-4 text-400",
        lg: "h-12 px-6 text-500",
        xl: "h-14 px-8 text-600",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      pill: {
        true: "rounded-full",
        false: "rounded-lg",
      },
    },
    defaultVariants: {
      variant: "contained",
      size: "md",
      fullWidth: false,
      pill: true,
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
export type ButtonVariant = NonNullable<ButtonVariants["variant"]>;
export type ButtonSize = NonNullable<ButtonVariants["size"]>;
