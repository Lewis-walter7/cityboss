import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "City Boss Motors | Premium Car Dealership",
    template: "%s | City Boss Motors"
  },
  description: "Discover premium vehicles at City Boss Motors. Explore our curated collection of luxury cars, SUVs, sedans, and 4x4s. Your dream car awaits.",
  keywords: ["car dealership", "luxury cars", "SUV", "sedan", "4x4", "premium vehicles", "used cars", "City Boss Motors"],
  authors: [{ name: "City Boss Motors" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://citybossmotors.com",
    siteName: "City Boss Motors",
    title: "City Boss Motors | Premium Car Dealership",
    description: "Discover premium vehicles at City Boss Motors. Explore our curated collection of luxury cars.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "City Boss Motors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "City Boss Motors | Premium Car Dealership",
    description: "Discover premium vehicles at City Boss Motors.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
      <script
        type="module"
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
      ></script>
    </html>
  );
}
