import AuthGuard from "@/components/AuthGuard";
import SignupForm from "@/features/auth/components/SignupForm";

export default function SignupPage() {
  return (
    <AuthGuard>
      <SignupForm />
    </AuthGuard>
  );
}
