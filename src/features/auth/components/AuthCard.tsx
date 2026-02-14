import { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Left Side - Branding */}
      <div
        className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url("/assets/auth-bg.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent" />

        {/* Branding Content */}
        <div className="relative z-10 px-12 text-center text-white max-w-lg">
          <h2 className="text-5xl font-extrabold tracking-tight">MindBook</h2>

          <p className="mt-4 text-lg text-white/80 leading-relaxed">
            Your personal space to capture thoughts, build ideas, and grow every
            day.
          </p>

          {/* Small Highlight */}
          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
            ✨ Secure • Simple • Personal
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full lg:w-1/2 overflow-y-auto items-center justify-center bg-gray-50">
        <div className="w-full min-h-full flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Card */}
            <div className="rounded-3xl bg-white p-10 shadow-xl border border-gray-100">
              {/* Header */}
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                <p className="mt-2 text-gray-500 text-sm">{subtitle}</p>
              </div>

              {/* Form Content */}
              <div className="mt-8 space-y-5">{children}</div>

              {/* Footer */}
              {footer && (
                <div className="mt-8 text-center text-sm text-gray-500">
                  {footer}
                </div>
              )}
            </div>

            {/* Extra Small Note */}
            <p className="mt-6 text-center text-xs text-gray-400">
              © {new Date().getFullYear()} MindBook. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
