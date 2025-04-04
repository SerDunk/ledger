// components/ClientLayout.tsx
"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ExpenseProviderWrapper } from "@/components/ExpenseProviderWrapper";
import Container from "@/components/Container";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ExpenseProviderWrapper>
        <Container>{children}</Container>
      </ExpenseProviderWrapper>
    </ClerkProvider>
  );
}
