import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StagewiseProvider } from "@/components/stagewise-provider";

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Watch - Popular movies",
  description: "Enjoy the newest movies",
  keywords: ["movies", "cinema", "popular movies", "new movies", "trailers"],
  authors: [{ name: "Abdulaziz Gabitov" }],
  creator: "Abdulaziz Gabitov",
  publisher: "Oitech.io",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Watch - Popular movies",
    description: "Enjoy the newest movies",
    siteName: "Watch",
  },
  twitter: {
    card: "summary_large_image",
    title: "Watch - Popular movies",
    description: "Enjoy the newest movies",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <StagewiseProvider />
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}
