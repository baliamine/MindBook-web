import { forwardRef, InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <input
          ref={ref}
          className={`
            w-full 
            px-3 sm:px-4 
            py-2.5 sm:py-3 
            rounded-lg 
            border 
            border-gray-200 
            focus:border-indigo-500 
            focus:ring-4 
            focus:ring-indigo-500/10 
            transition-all 
            outline-none 
            text-gray-700
            ${error ? "border-red-300 focus:border-red-500 focus:ring-red-500/10" : ""}
            ${className}
          `}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
