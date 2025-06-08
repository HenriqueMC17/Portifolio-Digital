import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { AnimationProvider } from "@/components/animation-provider"
import { PerformanceProvider } from "@/components/performance-provider"
import { AnalyticsProvider } from "@/components/analytics-provider"
import { EasterEggProvider } from "@/components/easter-egg-provider"
import { PWAInstaller } from "@/components/pwa-installer"
import { EasterEggPanel } from "@/components/easter-egg-panel"
import { Toaster } from "@/components/ui/toast"
import Script from "next/script"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: "Henrique Monteiro Cardoso - Desenvolvedor Full Stack",
    template: "%s | Henrique Monteiro Cardoso",
  },
  description:
    "Desenvolvedor Full Stack especializado em Java, JavaScript, TypeScript, Python. Criando soluções inovadoras e funcionais com foco em performance e experiência do usuário.",
  keywords: [
    "Desenvolvedor Full Stack",
    "Java",
    "JavaScript",
    "TypeScript",
    "Python",
    "React",
    "Node.js",
    "Next.js",
    "Desenvolvedor Web",
    "Programador",
    "São Paulo",
  ],
  authors: [{ name: "Henrique Monteiro Cardoso", url: "https://henriquemc.dev" }],
  creator: "Henrique Monteiro Cardoso",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://henriquemc.dev",
    title: "Henrique Monteiro Cardoso - Desenvolvedor Full Stack",
    description: "Desenvolvedor Full Stack especializado em tecnologias modernas",
    siteName: "Henrique MC Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Henrique Monteiro Cardoso - Desenvolvedor Full Stack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Henrique Monteiro Cardoso - Desenvolvedor Full Stack",
    description: "Desenvolvedor Full Stack especializado em tecnologias modernas",
    images: ["/og-image.png"],
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
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "HMC Portfólio",
  },
  applicationName: "HMC Portfólio",
  formatDetection: {
    telephone: false,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#10b981" },
    { media: "(prefers-color-scheme: dark)", color: "#10b981" },
  ],
  category: "technology",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.github.com" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="msapplication-TileColor" content="#10b981" />
        <meta name="theme-color" content="#10b981" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
          <AnalyticsProvider debug={process.env.NODE_ENV === "development"}>
            <PerformanceProvider>
              <LanguageProvider>
                <AnimationProvider>
                  <EasterEggProvider>
                    <Suspense fallback={null}>
                      {children}
                      <PWAInstaller />
                      <EasterEggPanel />
                      <Toaster />
                    </Suspense>
                  </EasterEggProvider>
                </AnimationProvider>
              </LanguageProvider>
            </PerformanceProvider>
          </AnalyticsProvider>
        </ThemeProvider>

        {/* Service Worker Registration */}
        <Script
          id="register-sw"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/service-worker.js')
                    .then(function(registration) {
                      console.log('Service Worker registrado:', registration.scope);
                    })
                    .catch(function(error) {
                      console.log('Falha ao registrar Service Worker:', error);
                    });
                });
              }
            `,
          }}
        />

        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Henrique Monteiro Cardoso",
              jobTitle: "Desenvolvedor Full Stack",
              description: "Desenvolvedor Full Stack especializado em Java, JavaScript, TypeScript, Python",
              url: "https://henriquemc.dev",
              sameAs: [
                "https://github.com/HenriqueMC17",
                "https://www.linkedin.com/in/henrique-monteiro-cardoso-ba3716229/",
              ],
              knowsAbout: ["JavaScript", "TypeScript", "Java", "Python", "React", "Node.js", "Next.js"],
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "Centro Universitário Facens",
              },
            }),
          }}
        />
      </body>
    </html>
  )
}
