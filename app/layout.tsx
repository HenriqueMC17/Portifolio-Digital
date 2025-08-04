import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { Toaster } from "@/components/ui/toast"
import { SEOHead } from "@/components/seo-head"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Henrique Monteiro Cardoso - Desenvolvedor Full Stack",
  description:
    "Portfolio profissional de Henrique Monteiro Cardoso, desenvolvedor Full Stack especializado em Java, React, Next.js e tecnologias modernas.",
  keywords: [
    "desenvolvedor",
    "full stack",
    "java",
    "react",
    "next.js",
    "spring boot",
    "portfolio",
    "henrique monteiro cardoso",
  ],
  authors: [{ name: "Henrique Monteiro Cardoso" }],
  creator: "Henrique Monteiro Cardoso",
  publisher: "Henrique Monteiro Cardoso",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://henrique-portfolio.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Henrique Monteiro Cardoso - Desenvolvedor Full Stack",
    description:
      "Portfolio profissional de Henrique Monteiro Cardoso, desenvolvedor Full Stack especializado em Java, React, Next.js e tecnologias modernas.",
    url: "https://henrique-portfolio.vercel.app",
    siteName: "Henrique Monteiro Cardoso Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Henrique Monteiro Cardoso - Desenvolvedor Full Stack",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Henrique Monteiro Cardoso - Desenvolvedor Full Stack",
    description:
      "Portfolio profissional de Henrique Monteiro Cardoso, desenvolvedor Full Stack especializado em Java, React, Next.js e tecnologias modernas.",
    images: ["/og-image.jpg"],
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
        <SEOHead />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            {children}
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
