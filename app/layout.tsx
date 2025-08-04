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
import { AccessibilityPanel, useKeyboardShortcuts, SkipLinks } from "@/components/accessibility-improvements"
import { SciFiCursor, InteractiveParticles } from "@/components/visual-easter-eggs"
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
    "Sorocaba",
    "Portfolio",
    "Henrique Monteiro Cardoso",
  ],
  authors: [{ name: "Henrique Monteiro Cardoso", url: "https://henriquemc.dev" }],
  creator: "Henrique Monteiro Cardoso",
  publisher: "Henrique Monteiro Cardoso",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://henriquemc.dev",
    title: "Henrique Monteiro Cardoso - Desenvolvedor Full Stack",
    description:
      "Desenvolvedor Full Stack especializado em tecnologias modernas. Criando soluções inovadoras com Java, JavaScript, TypeScript, Python e muito mais.",
    siteName: "Henrique MC Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Henrique Monteiro Cardoso - Desenvolvedor Full Stack",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Henrique Monteiro Cardoso - Desenvolvedor Full Stack",
    description: "Desenvolvedor Full Stack especializado em tecnologias modernas",
    images: ["/og-image.png"],
    creator: "@henriquemc17",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "HMC Portfólio",
    startupImage: [
      {
        url: "/icons/apple-startup-640x1136.png",
        media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/icons/apple-startup-750x1334.png",
        media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)",
      },
    ],
  },
  applicationName: "HMC Portfólio",
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#10b981" },
    { media: "(prefers-color-scheme: dark)", color: "#10b981" },
  ],
  category: "technology",
  classification: "Portfolio",
  referrer: "origin-when-cross-origin",
  colorScheme: "dark light",
  other: {
    "msapplication-TileColor": "#10b981",
    "msapplication-config": "/browserconfig.xml",
  },
    generator: 'v0.dev'
}

function KeyboardShortcutsProvider({ children }: { children: React.ReactNode }) {
  useKeyboardShortcuts()
  return <>{children}</>
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.github.com" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//api.github.com" />

        {/* Preload Critical Resources */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />

        {/* Icons and Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#10b981" />

        {/* Apple Web App */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="HMC Portfolio" />

        {/* Microsoft */}
        <meta name="msapplication-TileColor" content="#10b981" />
        <meta name="msapplication-TileImage" content="/icons/mstile-144x144.png" />

        {/* Additional Meta */}
        <meta name="theme-color" content="#10b981" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="HMC Portfolio" />

        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />

        {/* Performance Hints */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://henriquemc.dev" />

        {/* Alternate Languages */}
        <link rel="alternate" hrefLang="pt-BR" href="https://henriquemc.dev" />
        <link rel="alternate" hrefLang="en" href="https://henriquemc.dev/en" />
        <link rel="alternate" hrefLang="x-default" href="https://henriquemc.dev" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <SkipLinks />

        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
          <AnalyticsProvider debug={process.env.NODE_ENV === "development"}>
            <PerformanceProvider>
              <LanguageProvider>
                <AnimationProvider>
                  <EasterEggProvider>
                    <KeyboardShortcutsProvider>
                      <Suspense fallback={null}>
                        <main id="main-content">{children}</main>

                        {/* Accessibility & UX Components */}
                        <AccessibilityPanel />
                        <PWAInstaller />
                        <EasterEggPanel />
                        <Toaster />

                        {/* Visual Easter Eggs */}
                        <SciFiCursor />
                        <InteractiveParticles />
                      </Suspense>
                    </KeyboardShortcutsProvider>
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

        {/* Performance Monitoring */}
        <Script
          id="performance-monitor"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Web Vitals monitoring
              function sendToAnalytics(metric) {
                if (typeof gtag !== 'undefined') {
                  gtag('event', metric.name, {
                    event_category: 'Web Vitals',
                    event_label: metric.id,
                    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
                    non_interaction: true,
                  });
                }
              }
              
              // Monitor Core Web Vitals
              if ('PerformanceObserver' in window) {
                try {
                  new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                      if (entry.entryType === 'largest-contentful-paint') {
                        sendToAnalytics({name: 'LCP', value: entry.startTime, id: 'lcp'});
                      }
                    }
                  }).observe({entryTypes: ['largest-contentful-paint']});
                } catch (e) {}
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
              image: "https://henriquemc.dev/og-image.png",
              sameAs: [
                "https://github.com/HenriqueMC17",
                "https://www.linkedin.com/in/henrique-monteiro-cardoso-ba3716229/",
              ],
              knowsAbout: [
                "JavaScript",
                "TypeScript",
                "Java",
                "Python",
                "React",
                "Node.js",
                "Next.js",
                "Full Stack Development",
                "Web Development",
                "Software Engineering",
              ],
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "Centro Universitário Facens",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Sorocaba",
                addressRegion: "São Paulo",
                addressCountry: "BR",
              },
              email: "henriquemon17@gmail.com",
              telephone: "+5515988027261",
              worksFor: {
                "@type": "Organization",
                name: "CCBEU Sorocaba",
              },
            }),
          }}
        />
      </body>
    </html>
  )
}
