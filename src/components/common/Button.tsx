import { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  variant?: "primary" | "outline" | "danger";
  className?: string;
}

export const Button = ({
  children,
  isLoading = false,
  variant = "primary",
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "w-full py-2.5 sm:py-3 px-4 font-semibold rounded-lg transition-all flex justify-center items-center disabled:opacity-70";

  const variants = {
    primary:
      "bg-[#36656B] text-white shadow-lg hover:shadow-[#36656B]/30 hover:-translate-y-0.5",
    outline:
      "bg-transparent border-2 border-[#36656B] text-[#36656B] hover:bg-[#36656B]/5",
    danger:
      "bg-red-500 text-white shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5",
  };

  return (
    <button
      disabled={isLoading || disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading ? <Loader2 className="animate-spin" /> : children}
    </button>
  );
};
