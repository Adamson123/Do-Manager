import { AlertTriangle, FlameIcon, Leaf } from "lucide-react";
import clsx from "clsx";
import { CSSProperties } from "react";

interface PrioritiesTypes {
  className?: string;
  iconClassName?: string;
  style?: CSSProperties;
  iconStyle?: CSSProperties;
}

const High = ({
  className,
  iconClassName,
  style,
  iconStyle,
}: PrioritiesTypes) => {
  return (
    <span
      style={style}
      className={clsx(
        "text-[14px] py-[7px]",
        "tracking-wider text-highPriority",
        "border-highPriority",
        className
      )}
    >
      High{" "}
      <FlameIcon
        style={iconStyle}
        className={clsx(
          "inline fill-current",
          "-translate-y-[1px] -translate-x-[2px]",
          "h-[15px] w-[15px]",
          iconClassName
        )}
      />
    </span>
  );
};

const Medium = ({
  className,
  iconClassName,
  style,
  iconStyle,
}: PrioritiesTypes) => {
  return (
    <span
      style={style}
      className={clsx(
        "text-[14px] py-[7px]",
        "tracking-wider text-mediumPriority",
        "border-mediumPriority",
        className
      )}
    >
      Medium{" "}
      <AlertTriangle
        style={iconStyle}
        className={clsx(
          "inline fill-current",
          "-translate-y-[1px] -translate-x-[2px]",
          "h-[15px] w-[15px]",
          iconClassName
        )}
      />
    </span>
  );
};

const Low = ({
  className,
  iconClassName,
  style,
  iconStyle,
}: PrioritiesTypes) => {
  return (
    <span
      style={style}
      className={clsx(
        "text-[14px] py-[7px]",
        "tracking-wider text-lowPriority",
        "border-lowPriority",
        className
      )}
    >
      Low{" "}
      <Leaf
        style={iconStyle}
        className={clsx(
          "inline fill-current",
          "-translate-y-[1px] -translate-x-[2px]",
          "h-[15px] w-[15px]",
          iconClassName
        )}
      />
    </span>
  );
};

interface PriorityTypes extends PrioritiesTypes {
  priority: string;
}

const Priority = ({
  priority,
  className,
  iconClassName,
  style,
  iconStyle,
}: PriorityTypes) => {
  switch (priority) {
    case "HIGH":
      return (
        <High
          className={className}
          iconClassName={iconClassName}
          style={style}
          iconStyle={iconStyle}
        />
      );
    case "MEDIUM":
      return (
        <Medium
          className={className}
          iconClassName={iconClassName}
          style={style}
          iconStyle={iconStyle}
        />
      );
    default:
      return (
        <Low
          className={className}
          iconClassName={iconClassName}
          style={style}
          iconStyle={iconStyle}
        />
      );
  }
};

export default Priority;
