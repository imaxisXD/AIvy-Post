import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ConvexClientProvider from "../utils/ConvexClientProvider";
import { Urbanist } from "next/font/google";

const gorst = localFont({
  src: "../fonts/gorst.ttf",
  display: "swap",
  variable: "--font-gorst",
  style: "normal",
});

const urban = Urbanist({
  subsets: ["latin"],
  display: "swap",
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
      <body className={`${gorst.className} ${urban.variable}`}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
