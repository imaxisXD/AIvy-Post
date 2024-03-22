import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Urbanist } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const gorst = localFont({
  src: "../fonts/gorst.ttf",
  display: "swap",
  variable: "--font-gorst",
});

const satoshi = localFont({
  src: "../fonts/satoshi.ttf",
  display: "swap",
  variable: "--font-satoshi",
});

const urban = Urbanist({
  subsets: ["latin"],
  variable: "--font-urban",
});

export const metadata: Metadata = {
  title: "AIvy Post",
  description:
    "AIvy Post automates your Twitter and LinkedIn posts using advanced AI. No need for ghostwriting. Generate engaging content effortlessly.",
  keywords:
    "AI, Twitter automation, LinkedIn automation, content generation, AIvy Post",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${gorst.className} ${urban.variable} ${satoshi.variable}`}
      >
        {children}
      </body>
      <Toaster />
    </html>
  );
}
