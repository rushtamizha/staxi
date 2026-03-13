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

export const metadata = {
  title: "STAXI | #1 Oneway Drop Taxi in Tamil Nadu | Airport & Outstation",
  description: "Affordable Oneway Drop Taxi services across Tamil Nadu. Premium Airport pickups at Chennai, Madurai, Coimbatore & Trichy. Pay only for one way. No return charges.",
  keywords: [
    "Drop Taxi Tamil Nadu", 
    "Oneway Taxi Chennai", 
    "Madurai Airport Taxi", 
    "Coimbatore Drop Taxi", 
    "Outstation Taxi Tamil Nadu",
    "Chennai to Pondicherry Drop Taxi",
    "Trichy Airport Pickup"
  ],
  alternates: {
    canonical: "https://sonewaydroptaxi.in/", // Replace with your real domain
  },
  openGraph: {
    title: "STAXI | Premium Oneway Drop Taxi Service",
    description: "Save 50% on outstation trips. Only pay for the distance you travel.",
    url: "https://sonewaydroptaxi.in/",
    siteName: "STAXI",
    images: [
      {
        url: "/og-image.jpg", // Create a 1200x630 image with your logo and family photo
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  // Local Business Schema to help Google understand your service area
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "name": "STAXI Oneway Taxi",
    "description": "Premium Oneway Drop Taxi and Airport Pickup services in Tamil Nadu.",
    "url": "https://sonewaydroptaxi.in/",
    "telephone": "+918760212345",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Madurai",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    },
    "areaServed": [
      "Chennai", "Madurai", "Coimbatore", "Trichy", "Salem", "Pondicherry", "Vellore"
    ],
    "provider": {
      "@type": "LocalBusiness",
      "name": "STAXI"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
