import SignupForm from "@/features/auth/components/SignupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-gray-50 to-gray-50">
      <SignupForm />
    </div>
  );
}
