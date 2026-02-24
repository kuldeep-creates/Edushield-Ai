import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EduShield AI - Academic Early Warning System",
  description: "EduShield AI provides real-time academic early warnings and intervention strategies to ensure every student succeeds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
