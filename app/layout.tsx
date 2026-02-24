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
      <head>
        {/* Material Symbols — icon font required by all pages */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
