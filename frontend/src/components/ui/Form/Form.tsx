"use client";

import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
} from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { Label } from "@/components/ui/Label";
import { cn } from "@/lib/utils/cn";

/* ─── Form wrapper ───────────────────────────────────── */

export const Form = FormProvider;

/* ─── Field context ──────────────────────────────────── */

type FormFieldContextValue = {
  name: string;
  id: string;
  errorId: string;
  hintId: string;
};

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

function useFormField() {
  const fieldContext = useContext(FormFieldContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext) {
    throw new Error("useFormField must be used within a <FormField>");
  }

  const fieldState = getFieldState(fieldContext.name, formState);

  return {
    id: fieldContext.id,
    name: fieldContext.name,
    formItemId: fieldContext.id,
    formDescriptionId: fieldContext.hintId,
    formMessageId: fieldContext.errorId,
    error: fieldState.error?.message,
    ...fieldState,
  };
}

/* ─── FormField ──────────────────────────────────────── */

export type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, "render"> & {
  children?: ControllerProps<TFieldValues, TName>["render"] extends (
    ...args: infer A
  ) => unknown
    ? (...args: A) => React.ReactNode
    : never;
};

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  const id = useId();

  return (
    <FormFieldContext.Provider
      value={{
        name: props.name,
        id,
        errorId: `${id}-error`,
        hintId: `${id}-hint`,
      }}
    >
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

/* ─── FormItem ───────────────────────────────────────── */

export const FormItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function FormItem({ className, ...props }, ref) {
    return <div ref={ref} className={cn("space-y-1.5", className)} {...props} />;
  },
);

/* ─── FormLabel ──────────────────────────────────────── */

export const FormLabel = forwardRef<
  ElementRef<typeof Label>,
  ComponentPropsWithoutRef<typeof Label>
>(function FormLabel({ className, ...props }, ref) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      htmlFor={formItemId}
      className={cn(error && "text-destructive", className)}
      {...props}
    />
  );
});

/* ─── FormControl ────────────────────────────────────── */

export const FormControl = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function FormControl({ children, ...props }, ref) {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

    return (
      <div
        ref={ref}
        id={formItemId}
        aria-describedby={
          error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId
        }
        aria-invalid={Boolean(error) || undefined}
        {...props}
      >
        {children}
      </div>
    );
  },
);

/* ─── FormDescription ────────────────────────────────── */

export const FormDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(function FormDescription({ className, ...props }, ref) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-200 text-neutral-600", className)}
      {...props}
    />
  );
});

/* ─── FormMessage ────────────────────────────────────── */

export const FormMessage = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(function FormMessage({ className, children, ...props }, ref) {
  const { error, formMessageId } = useFormField();
  const body =
    typeof error === "string"
      ? error
      : error && typeof error === "object" && "message" in error
        ? String(error.message ?? "")
        : children;

  if (!body) return null;

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-200 font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
});
