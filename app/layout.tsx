import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TripFront",
  description: "Plan Your Next Adventure Together",
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
        <nav className="bg-gray-100 dark:bg-gray-800 py-4">
          <div className="container mx-auto px-4">
            <Link href="/" className="logo">TripFront</Link>
          </div>
        </nav>
        
        {/* Flash messages would go here in a real app */}
        
        {children}
      </body>
    </html>
  );
}
