import type { Metadata } from "next";
import { Inter, Space_Grotesk, Albert_Sans } from "next/font/google";
import { MainLayout } from "@/components/layout/main-layout";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});
const albertSans = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-albert-sans",
});

export const metadata: Metadata = {
  title: "Drive Admin",
  description: "Admin Panel for managing drivers, onboarding, and inquiries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${albertSans.variable} font-body`}
      >
        <MainLayout>{children}</MainLayout>
        <Toaster />
      </body>
    </html>
  );
}
