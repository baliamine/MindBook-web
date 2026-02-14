import { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="w-full max-w-lg mx-auto px-4 sm:px-6 md:px-8">
      <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            {title}
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">{subtitle}</p>
        </div>

        {/* Content */}
        {children}

        {/* Footer */}
        {footer && (
          <div className="mt-6 text-center text-sm text-gray-500">{footer}</div>
        )}
      </div>
    </div>
  );
}
