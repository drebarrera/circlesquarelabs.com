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
  title: "CircleSquare Labs",
  description:
    "CircleSquare Labs is an Austin, Texas based full-service technology firm offering web development, app development, cloud solutions, full-stack engineering, brand design, and data processing to drive business success.",
  keywords:
    "Full-service technology firm, Web development, Custom software development, Cloud solutions, Full-stack engineering, Brand identity design, Data processing, API development, App development, Business digital transformation, Scalable web apps, Microservices, Data analytics, UX/UI design, Startups tech solutions, Technology consulting, Austin web development",
  openGraph: {
    title: "CircleSquare Labs",
    description:
      "CircleSquare Labs is an Austin, Texas based full-service technology firm offering web development, app development, cloud solutions, full-stack engineering, brand design, and data processing to drive business success.",
    url: "https://www.circlesquarelabs.com",
    images: [
      {
        url: "/title_card.png",
        width: 1200,
        height: 630,
        alt: "CircleSquare Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CircleSquare Labs",
    description:
      "CircleSquare Labs is an Austin, Texas based full-service technology firm offering web development, app development, cloud solutions, full-stack engineering, brand design, and data processing to drive business success.",
    images: ["/title_card.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
