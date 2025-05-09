import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <SignIn appearance={{
        elements: {
          formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white",
          card: "shadow-lg rounded-lg",
        }
      }} />
    </div>
  );
} 