import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fiso AI | Intelligent Growth Systems",
  description:
    "Fiso AI builds AI strategy, automation, and design systems for scalable brand growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
