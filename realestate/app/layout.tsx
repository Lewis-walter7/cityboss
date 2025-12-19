import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "City Boss Estates | Premium Real Estate",
  description: "Find your dream luxury property with City Boss Estates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased selection:bg-[var(--color-accent)] selection:text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
