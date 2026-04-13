import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aura IoT",
  description: "Portal de control para soluciones IoT con Supabase y ThingSpeak.",
  icons: {
    icon: "/AURA.png",
    shortcut: "/AURA.png",
    apple: "/AURA.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} min-h-full`}>
      <body className="min-h-full bg-white text-gray-900">{children}</body>
    </html>
  );
}
