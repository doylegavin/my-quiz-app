"use client";

import { useEffect } from 'react';
import { registerEnhancedSubjects } from "@/data/subjects/enhanced-samples";

export default function EnhancedSubjectsInitializer() {
  useEffect(() => {
    // Register enhanced subjects on the client-side after component mounts
    registerEnhancedSubjects();
  }, []);

  return null; // This component doesn't render anything
} 