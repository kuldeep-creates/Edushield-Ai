import type { Metadata } from "next";
import "material-symbols/outlined.css";
import "./globals.css";

export const viewport = {
  themeColor: "#0f172a",
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "EduShield AI | Academic Early Warning System",
    template: "%s | EduShield AI"
  },
  description: "Advanced AI-powered platform for academic risk intervention and student success tracking in India.",
  metadataBase: new URL('https://edushield.ai'),
  verification: {
    google: "google-site-verification-id", // User should replace with actual ID
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
