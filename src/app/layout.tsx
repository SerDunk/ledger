import type { Metadata } from "next";

import "./globals.css";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Lady Ledger",
  description: "Official NSV Ladies Club Ledger",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Container>{children}</Container>
      </body>
    </html>
  );
}
