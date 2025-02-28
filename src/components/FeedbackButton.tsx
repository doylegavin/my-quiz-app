//src/components/FeedbackButton.tsx

"use client";
import Link from "next/link";
import { useState } from "react";

export default function FeedbackButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="https://docs.google.com/forms/d/e/1FAIpQLSdWeFnLbo3DImicGuFlyJ02kmcKnjFtemdQPswtBdWiXb_l4Q/viewform?usp=header"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 bg-purple-600 text-white px-5 py-3 rounded-full shadow-lg transition-all duration-3000 ${
        isHovered ? "scale-110" : "animate-pulse"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Feedback 💬
    </Link>
  );
}
