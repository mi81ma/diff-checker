import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Diff Checker',
  description: 'A modern web application for checking and visualizing differences between text snippets',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
    other: {
      rel: 'apple-touch-icon',
      url: '/icon.svg',
    },
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://diff-checker.vercel.app/',
    title: 'Diff Checker',
    description: 'A modern web application for checking and visualizing differences between text snippets',
    siteName: 'Diff Checker',
    images: [{
      url: '/icon.svg',
      width: 100,
      height: 100,
      alt: 'Diff Checker Logo',
    }],
  },
  twitter: {
    card: 'summary',
    title: 'Diff Checker',
    description: 'A modern web application for checking and visualizing differences between text snippets',
    images: ['/icon.svg'],
    creator: '@yourtwitterhandle',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
