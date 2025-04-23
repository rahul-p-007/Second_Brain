import { ReactNode } from "react";

type variants = "primary" | "secondary";
export interface ButtonProps {
  variant: variants;
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClick: () => void;
}
const variantStyles = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-300 text-purple-600",
};
const sizeStyles = {
  sm: "px-2 py-2 text-sm",
  md: "px-5 py-3 text-md",
  lg: "px-7 py-2 textx-lg",
};
const defaultStyles = "rounded-md";
function Button({
  variant,
  size,
  text,
  startIcon,
  endIcon,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`${variantStyles[variant]} ${defaultStyles} ${sizeStyles[size]}
    `}
    >
      <p className="flex items-center  gap-1">
        {startIcon}
        {text}
      </p>
    </button>
  );
}

export default Button;
