import type React from "react"
import type { Metadata } from "next"
import { Inter, Orbitron, Fira_Code } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import DynamicBackground from "@/components/dynamic-background"
import { VisualEasterEggs } from "@/components/visual-easter-eggs"
import { LanguageProvider } from "@/components/language-provider"
import { PerformanceProvider } from "@/components/performance-provider"
import { AnalyticsProvider } from "@/components/analytics-provider"
import { EasterEggProvider } from "@/components/easter-egg-provider"
import { PWAInstaller } from "@/components/pwa-installer"
import { AnalyticsConsent } from "@/components/analytics-consent"
import { AccessibilityImprovements } from "@/components/accessibility-improvements"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
})

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Henrique Monteiro Cardoso | Full Stack Developer",
    template: "%s | Henrique Monteiro Cardoso",
  },
  description:
    "Desenvolvedor Full Stack especializado em React, Next.js, Java e Spring Boot. Criando soluções digitais inovadoras com foco em performance e experiência do usuário.",
  keywords: [
    "Henrique Monteiro Cardoso",
    "Full Stack Developer",
    "React Developer",
    "Next.js",
    "Java Developer",
    "Spring Boot",
    "TypeScript",
    "Frontend",
    "Backend",
    "Web Development",
    "Portfolio",
    "Brasil",
  ],
  authors: [{ name: "Henrique Monteiro Cardoso" }],
  creator: "Henrique Monteiro Cardoso",
  publisher: "Henrique Monteiro Cardoso",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://henriquemc.dev",
    title: "Henrique Monteiro Cardoso | Full Stack Developer",
    description:
      "Desenvolvedor Full Stack especializado em React, Next.js, Java e Spring Boot. Criando soluções digitais inovadoras.",
    siteName: "Henrique Monteiro Cardoso Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Henrique Monteiro Cardoso - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Henrique Monteiro Cardoso | Full Stack Developer",
    description: "Desenvolvedor Full Stack especializado em React, Next.js, Java e Spring Boot.",
    images: ["/og-image.jpg"],
    creator: "@henriquemc17",
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
  verification: {
    google: "your-google-verification-code",
  },
  category: "technology",
  manifest: "/manifest.json",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${inter.variable} ${orbitron.variable} ${firaCode.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#00ffff" />
        <meta name="color-scheme" content="dark light" />
      </head>
      <body className="font-sans antialiased overflow-x-hidden">
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium"
        >
          Pular para o conteúdo principal
        </a>

        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
          <LanguageProvider>
            <PerformanceProvider>
              <AnalyticsProvider>
                <EasterEggProvider>
                  <Suspense
                    fallback={
                      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                        <div className="relative">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
                          <div className="absolute inset-0 animate-ping rounded-full h-12 w-12 border border-cyan-400 opacity-20"></div>
                        </div>
                      </div>
                    }
                  >
                    {/* Futuristic Background System */}
                    <DynamicBackground />

                    {/* Visual Effects */}
                    <VisualEasterEggs />

                    {/* Main Content */}
                    <main id="main-content" className="relative z-10">
                      {children}
                    </main>

                    {/* Interactive Components */}
                    <AccessibilityImprovements />
                    <PWAInstaller />

                    {/* Toast Notifications */}
                    <Toaster />

                    {/* Analytics Consent */}
                    <AnalyticsConsent />
                  </Suspense>
                </EasterEggProvider>
              </AnalyticsProvider>
            </PerformanceProvider>
          </LanguageProvider>
        </ThemeProvider>

        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/service-worker.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
