import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Ledger",
  description: "Your easy-to-use record keeper",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ClerkProvider>
          <Container>{children}</Container>
        </ClerkProvider>
      </body>
    </html>
  );
}
