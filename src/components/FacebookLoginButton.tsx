import { Button } from "@/components/ui/button";
import { FaFacebook } from "react-icons/fa";
import { signIn } from "next-auth/react";

interface FacebookLoginButtonProps {
  callbackUrl?: string;
}

export function FacebookLoginButton({ callbackUrl = "/" }: FacebookLoginButtonProps) {
  return (
    <Button
      type="button"
      className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white"
      onClick={() => signIn("facebook", { callbackUrl })}
    >
      <FaFacebook className="mr-2 h-4 w-4" />
      Continue with Facebook
    </Button>
  );
} 