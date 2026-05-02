import React from "react";
import type { Metadata, Viewport } from "next";
import "@/styles/globals.scss";
import "@/styles/variables.scss";
import { ThemeProvider } from '@/context/themeContext';
import ParticleField from "@/components/particleField";
import ThemeSwitcher from "@/components/themeSwitcher";
import Footer from "@/components/footer";

/**
 * Site Metadata Configuration
 * Defines SEO and Open Graph properties for the site
 */
export const metadata: Metadata = {
  title: "kicanter.dev",
  description: "If you're reading this, drink more milk",
  applicationName: "kicanter.dev",
  authors: [{ name: "Kieran Canter" }],
  keywords: ["development", "portfolio"],
  creator: "Kieran Canter",
  publisher: "Kieran Canter",
  manifest: "/manifest.json",
  formatDetection: {
    telephone: false,
    date: true,
    address: false,
    email: true,
    url: true
  },
  metadataBase: new URL("https://kicanter.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "kicanter.dev",
    description: "If you're reading this, drink more milk",
    url: "https://kicanter.dev",
    siteName: "kicanter.dev",
    locale: "en_US",
    type: "website",
    images: [{
      url: '/images/thumbnail.png',
      width: 1200,
      height: 761,
      alt: "Kieran's Site",
      type: 'image/png',
    }],
  },
};

/**
 * Viewport Configuration
 * Controls responsive behavior and theme colors
 */
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#B9ACAE' },
    { media: '(prefers-color-scheme: dark)', color: '#2B2425' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

/**
 * Root Layout Component
 * Provides theme context and basic page structure
 * Includes analytics, favicons, and global styles
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* SVG Favicon for modern browsers */}
        <link rel="icon" type="image/svg+xml" sizes="any" href="/images/favicons/SVG/favicon.svg" />

        {/* Standard Favicons */}
        <link rel="icon-light" type="image/png" sizes="16x16" href="/images/favicons/PNG/favicon-light_16.png" />
        <link rel="icon-light" type="image/png" sizes="32x32" href="/images/favicons/PNG/favicon-light_32.png" />
        <link rel="icon-light" type="image/png" sizes="512x512" href="/images/favicons/PNG/favicon-light_512.png" />
        <link rel="icon-dark" type="image/png" sizes="16x16" href="/images/favicons/PNG/favicon-dark_16.png" />
        <link rel="icon-dark" type="image/png" sizes="32x32" href="/images/favicons/PNG/favicon-dark_32.png" />
        <link rel="icon-dark" type="image/png" sizes="512x512" href="/images/favicons/PNG/favicon-dark_512.png" />

        {/* Platform-specific Icons */}
        <link rel="icon-light" type="image/png" sizes="192x192" href="/images/favicons/PNG/favicon-light_android.png" />
        <link rel="icon-dark" type="image/png" sizes="192x192" href="/images/favicons/PNG/favicon-dark_android.png" />
        <link rel="apple-touch-icon-light" type="image/png" sizes="180x180" href="/images/favicons/PNG/favicon-light_apple.png" />
        <link rel="apple-touch-icon-dark" type="image/png" sizes="180x180" href="/images/favicons/PNG/favicon-dark_apple.png" />

        {/* Legacy Support */}
        <link rel="favicon" type="image/x-icon" href="/favicon.ico" />
      </head>

      <body className="antialiased bg-bg text-fgSoft selection:text-bg selection:bg-fgSoft [&_*]:no-scrollbar transition-colors duration-250">
        <ThemeProvider>
          {/* Main Application Container */}
          <div className="fixed inset-0 p-4 lg:p-8" role="application">
            <div className="relative h-full border border-fgHard" role="main" aria-label="Main content area">
              <ParticleField color="rgb(110, 110, 110)" aria-hidden="true" />
              {children}
            </div>

            {/* Footer and Theme Controls */}
            <div className="relative flex flex-row w-full h-fit justify-between">
              <footer className="relative flex w-fit h-fit">
                <Footer />
              </footer>

              <div className="max-lg:hidden relative flex w-fit h-fit" role="complementary">
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
