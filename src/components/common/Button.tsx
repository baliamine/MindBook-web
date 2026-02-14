import { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  className?: string; // Allow overriding/merging classes
}

export const Button = ({
  children,
  isLoading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={isLoading || disabled}
      className={`
        w-full 
        py-2.5 sm:py-3
        px-4 
        bg-[#36656B]
        text-white 
        font-semibold 
        rounded-lg 
        shadow-lg 
        hover:shadow-[#36656B]/30 
        hover:-translate-y-0.5 
        transition-all 
        disabled:opacity-70 
        flex 
        justify-center 
        items-center
        ${className}
      `}
      {...props}
    >
      {isLoading ? <Loader2 className="animate-spin" /> : children}
    </button>
  );
};
