"use client"; 
// "use client" is needed if you are using the provider in the Next.js App Router to ensure this component runs on the client side.

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from "@tanstack/react-query";

interface ReactQueryProviderProps {
  children: ReactNode;
}

// Create a new QueryClient instance. 
// You can also configure things like defaultOptions here for caching, retry policies, etc.
const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  mutationCache: new MutationCache(),
  defaultOptions: {
    queries: {
      // how often refetch happens, error retries, etc.
      refetchOnWindowFocus: false,
      retry: 1
    }
  },
});

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
