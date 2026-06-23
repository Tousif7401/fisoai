import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Calmify - Mental Health for Developers",
  description: "A free AI-powered mental health companion for developers, builders, and creators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
