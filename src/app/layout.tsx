import type { Metadata } from "next";

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
        <Container>{children}</Container>
      </body>
    </html>
  );
}
