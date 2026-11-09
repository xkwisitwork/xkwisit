import { cva, type VariantProps } from "class-variance-authority";

export const motionVariants = cva("inline-flex items-center", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      secondary: "bg-muted text-foreground",
      outline: "border border-border text-foreground",
    },
    size: {
      sm: "h-8 px-3 text-300",
      md: "h-10 px-4 text-400",
      lg: "h-11 px-5 text-500",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export type MotionVariantProps = VariantProps<typeof motionVariants>;
