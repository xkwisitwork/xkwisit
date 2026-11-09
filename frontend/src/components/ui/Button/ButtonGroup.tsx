import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils/cn";

import type { ButtonProps } from "./Button";

export type ButtonGroupProps = {
  children: ReactNode;
  className?: string;
  /** Orientation of the group. */
  orientation?: "horizontal" | "vertical";
  /** Whether the buttons share borders (attached) or are spaced (detached). */
  attached?: boolean;
};

/**
 * Groups multiple buttons, optionally attaching them into a segmented control.
 *
 * @example
 *   <ButtonGroup attached>
 *     <Button variant="outlined">Day</Button>
 *     <Button variant="outlined">Week</Button>
 *     <Button variant="outlined">Month</Button>
 *   </ButtonGroup>
 */
export function ButtonGroup({
  children,
  className,
  orientation = "horizontal",
  attached = false,
}: ButtonGroupProps) {
  const items = Children.toArray(children).filter(
    isValidElement,
  ) as ReactElement<ButtonProps>[];

  if (!attached) {
    return (
      <div
        role="group"
        className={cn(
          "inline-flex items-center gap-2",
          orientation === "vertical" && "flex-col items-stretch",
          className,
        )}
      >
        {items}
      </div>
    );
  }

  return (
    <div
      role="group"
      className={cn(
        "isolate inline-flex",
        orientation === "horizontal" ? "flex-row" : "flex-col",
        className,
      )}
    >
      {items.map((child, index) =>
        cloneElement(child, {
          key: child.key ?? index,
          pill: false,
          className: cn(
            "focus-visible:z-10",
            index === 0 && orientation === "horizontal" && "rounded-r-none rounded-l-lg",
            index === items.length - 1 &&
              orientation === "horizontal" &&
              "rounded-l-none rounded-r-lg",
            index > 0 &&
              index < items.length - 1 &&
              orientation === "horizontal" &&
              "rounded-none -ml-px",
            index === 0 && orientation === "vertical" && "rounded-b-none rounded-t-lg",
            index === items.length - 1 &&
              orientation === "vertical" &&
              "rounded-t-none rounded-b-lg",
            index > 0 &&
              index < items.length - 1 &&
              orientation === "vertical" &&
              "rounded-none -mt-px",
            child.props.className,
          ),
        }),
      )}
    </div>
  );
}
