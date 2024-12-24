// src/app/quiz/generated/page.tsx (Server Component by default)

import { Suspense } from "react";
import GeneratedQuizClient from "./GeneratedQuizClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GeneratedQuizClient />
    </Suspense>
  );
}
