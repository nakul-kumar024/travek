import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-amber-50/40 to-orange-50/30 flex items-center justify-center p-6">
      <SignUp 
        appearance={{
          elements: {
            formButtonPrimary: "bg-amber-500 hover:bg-amber-600",
            card: "shadow-xl",
          },
        }}
      />
    </div>
  );
}