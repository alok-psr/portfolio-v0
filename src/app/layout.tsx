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
  metadataBase: new URL("https://alokpsr.vercel.app"),
  title: {
    default: "Alok | Full Stack Developer",
    template: "%s | Alok",
  },
  description: "Full Stack Developer & UI/UX Enthusiast. Building digital experiences with code and creativity.",
  keywords: ["Full Stack Developer", "React", "Next.js", "TypeScript", "UI/UX", "Portfolio", "Web Development"],
  authors: [{ name: "Alok" }],
  creator: "Alok",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alok-portfolio.vercel.app",
    title: "Alok | Full Stack Developer",
    description: "Full Stack Developer & UI/UX Enthusiast. Building digital experiences with code and creativity.",
    siteName: "Alok's Portfolio",
    images: [
      {
        url: "/og-image.png", // We should ideally create this or use the profile image
        width: 1200,
        height: 630,
        alt: "Alok - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alok | Full Stack Developer",
    description: "Full Stack Developer & UI/UX Enthusiast. Building digital experiences with code and creativity.",
    images: ["/og-image.png"],
    creator: "@AL0K__PSR",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://alokpsr.vercel.app",
  },
  verification: {
    google:
    "i00C2ZR_KUXAnSNd-3hFLLc3cVdLcZE4wAqFjUlkVxc",
  },
};

import { ThemeProvider } from "@/components/theme-provider";
import { Terminal } from "@/components/Terminal";
import { Background } from "@/components/Background";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { SystemProvider } from "@/context/SystemContext";
import { Toaster } from "@/components/ui/sonner";
// import { KeyboardNavigation } from "@/components/KeyboardNavigation";
import { HomeButton } from "@/components/HomeButton";
import { getProfile } from "@/lib/db";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getProfile();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: "https://alokpsr.vercel.app",
    image: profile.image,
    sameAs: [
      profile.social.github,
      profile.social.linkedin,
      profile.social.twitter,
    ],
    jobTitle: profile.title,
    description: profile.bio,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8PP4T14H5Y"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-8PP4T14H5Y');
          `}
        </Script>
        <SystemProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Cursor />
            <Background />
            {/* <KeyboardNavigation /> */}
            <HomeButton image={profile.image} />
            <div className="flex-1 flex flex-col relative z-10">
               {/* Main Content Frame Container */}
               <main className="flex-1 flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  {children}
               </main>
               <Footer />
               <Terminal />
               <Toaster />
               <Analytics />
            </div>
          </ThemeProvider>
        </SystemProvider>
      </body>
    </html>
  );
}
