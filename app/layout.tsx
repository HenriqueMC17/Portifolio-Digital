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
import { CustomCursor } from "@/components/advanced-animations"
import { PWAInstaller } from "@/components/pwa-installer"
import { EasterEggPanel } from "@/components/easter-egg-panel"
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
  title: "Henrique Monteiro Cardoso",
  description:
    "Desenvolvedor Full Stack especializado em Java, JavaScript, TypeScript, Python. Criando soluções inovadoras e funcionais.",
  keywords: "Full Stack Developer, Java, JavaScript, TypeScript, Python, React, Node.js, Desenvolvedor",
  authors: [{ name: "Henrique Monteiro Cardoso" }],
  openGraph: {
    title: "Henrique Monteiro Cardoso",
    description: "Desenvolvedor Full Stack especializado em tecnologias modernas",
    url: "https://henriquemc.dev",
    siteName: "Henrique MC Portfolio",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
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
  themeColor: "#10b981",
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
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
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
                      <CustomCursor />
                      <PWAInstaller />
                      <EasterEggPanel />
                    </Suspense>
                  </EasterEggProvider>
                </AnimationProvider>
              </LanguageProvider>
            </PerformanceProvider>
          </AnalyticsProvider>
        </ThemeProvider>

        {/* Registrar o Service Worker */}
        <Script
          id="register-sw"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/service-worker.js')
                    .then(function(registration) {
                      console.log('Service Worker registrado com sucesso:', registration.scope);
                    })
                    .catch(function(error) {
                      console.log('Falha ao registrar o Service Worker:', error);
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
