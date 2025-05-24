import { createBoundClassNames } from "@utils/classNameBinder";
import styles from "./Flex.module.css";

const cx = createBoundClassNames(styles);

interface FlexProps {
  children: React.ReactNode;
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  align?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function Flex({
  children,
  direction = "row",
  justify = "flex-start",
  align = "stretch",
  wrap = "nowrap",
  gap,
  className,
  ...props
}: FlexProps) {
  return (
    <div
      className={cx(
        "flex",
        `direction-${direction}`,
        `justify-${justify}`,
        `align-${align}`,
        `wrap-${wrap}`,
        gap && `gap-${gap}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
