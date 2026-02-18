import type React from "react"
import type { Metadata } from "next"
import { Inter, Orbitron, Fira_Code } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { AnalyticsProvider } from "@/components/analytics-provider"
import { Toaster } from "@/components/ui/toaster"
import Script from "next/script"

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
  metadataBase: new URL("https://henriquemonteiro.dev"),
  title: {
    default: "Henrique Monteiro Cardoso | Full Stack Developer & AI Specialist",
    template: "%s | Henrique Monteiro",
  },
  description:
    "Desenvolvedor Full Stack especializado em Java, JavaScript, TypeScript, Python e soluções de IA. Criando experiências digitais inovadoras com foco em performance e usabilidade.",
  keywords: [
    "Henrique Monteiro Cardoso",
    "desenvolvedor full stack",
    "java developer",
    "javascript developer",
    "typescript",
    "python",
    "react",
    "next.js",
    "inteligência artificial",
    "machine learning",
    "portfolio desenvolvedor",
    "sorocaba desenvolvedor",
  ],
  authors: [{ name: "Henrique Monteiro Cardoso", url: "https://github.com/HenriqueMC17" }],
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
    url: "https://henriquemonteiro.dev",
    title: "Henrique Monteiro Cardoso | Full Stack Developer",
    description: "Desenvolvedor Full Stack especializado em criar soluções inovadoras com React, Java e Python",
    siteName: "Henrique Monteiro Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Henrique Monteiro - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Henrique Monteiro Cardoso | Full Stack Developer",
    description: "Desenvolvedor Full Stack & AI Specialist",
    images: ["/og-image.png"],
    creator: "@henriquemonteiro",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "seu-codigo-google-search-console",
  },
  alternates: {
    canonical: "https://henriquemonteiro.dev",
    languages: {
      "pt-BR": "https://henriquemonteiro.dev",
      "en-US": "https://henriquemonteiro.dev/en",
    },
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
        <link rel="dns-prefetch" href="https://api.github.com" />
        <meta name="theme-color" content="#7a7fee" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <AnalyticsProvider>
              <a href="#main-content" className="skip-to-content">
                Pular para o conteúdo principal
              </a>
              {children}
              <Toaster />
            </AnalyticsProvider>
          </LanguageProvider>
        </ThemeProvider>

        {/* Schema.org structured data */}
        <Script id="schema-org" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Henrique Monteiro Cardoso",
            url: "https://henriquemonteiro.dev",
            image: "https://henriquemonteiro.dev/og-image.png",
            sameAs: [
              "https://github.com/HenriqueMC17",
              "https://www.linkedin.com/in/henrique-monteiro-cardoso-ba3716229/",
            ],
            jobTitle: "Full Stack Developer",
            worksFor: {
              "@type": "Organization",
              name: "CCBEU Sorocaba",
            },
            alumniOf: {
              "@type": "EducationalOrganization",
              name: "Centro Universitário Facens",
            },
            knowsAbout: [
              "Java",
              "JavaScript",
              "TypeScript",
              "Python",
              "C++",
              "C#",
              "HTML5",
              "CSS3",
              "SQL",
              "React",
              "Next.js",
              "Node.js",
            ],
            email: "henriquemon17@gmail.com",
            telephone: "+5515988027261",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Sorocaba",
              addressRegion: "SP",
              addressCountry: "BR",
            },
          })}
        </Script>
      </body>
    </html>
  )
}
