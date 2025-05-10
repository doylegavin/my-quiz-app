"use client";

import { Suspense } from "react";
import ExamPaperExplorer from "@/components/ExamPaperExplorer";

export default function ExamsPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Exam Papers</h1>
      
      <Suspense fallback={<div className="flex justify-center p-12">Loading exam papers...</div>}>
        <ExamPaperExplorer />
      </Suspense>
    </div>
  );
} 