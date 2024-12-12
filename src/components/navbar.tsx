// components/navbar.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/dashboard" className="font-bold text-xl">
            StudyApp
          </Link>
          
          <div className="space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/quiz/create">
              <Button variant="ghost">Create Quiz</Button>
            </Link>
            <Button variant="outline">Profile</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}