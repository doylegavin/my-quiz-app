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
      className={`fixed bottom-6 right-6 bg-brand text-white px-5 py-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 ${
        isHovered ? "scale-110" : "animate-soft-pulse"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      💬 Feedback
    </Link>
  );
}
