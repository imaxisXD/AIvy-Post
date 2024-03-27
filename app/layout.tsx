import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Urbanist } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

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
  title:
    "LinkedIn Automation Tool | LinkedinFy - Automate Posts, Campaigns & More",
  description:
    "Streamline your LinkedIn presence with LinkedinFy. Our AI-powered tool automates post creation, campaign management, and content generation, helping you stay ahead of the game without the hassle of ghostwriting. Effortlessly generate engaging content and amplify your brand's reach on LinkedIn.",
  keywords:
    "LinkedIn automation tool, AI content generation, social media automation, LinkedIn marketing, content creation, campaign management, LinkedinFy, ghostwriting alternative, AI-powered marketing",
  openGraph: {
    title:
      "LinkedIn Automation Tool | LinkedinFy - Automate Posts, Campaigns & More",
    description:
      "Streamline your LinkedIn presence with LinkedinFy. Our AI-powered tool automates post creation, campaign management, and content generation, helping you stay ahead of the game without the hassle of ghostwriting. Effortlessly generate engaging content and amplify your brand's reach on LinkedIn.",
    url: "https://www.linkedinfy.com",
    siteName: "LinkedinFy",
    images: [
      {
        url: "https://www.linkedinfy.com/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Analytics />
      <body
        className={`${gorst.className} ${urban.variable} ${satoshi.variable}`}
      >
        {children}
      </body>
      <Toaster />
      <Script
        id="SEO"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "LinkedinFy",
            description:
              "Streamline your LinkedIn presence with LinkedinFy. Our AI-powered tool automates post creation, campaign management, and content generation, helping you stay ahead of the game without the hassle of ghostwriting. Effortlessly generate engaging content and amplify your brand's reach on LinkedIn.",
            operatingSystem: "Web",
            applicationCategory: "BusinessApplication",
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              price: "0.00",
            },
          }),
        }}
      />
    </html>
  );
}
