import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import { AnimationProvider } from "@/contexts/animation-context"
import { Analytics } from "@/components/analytics"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portfólio - Desenvolvedor Full Stack",
  description:
    "Portfólio profissional de desenvolvedor full stack especializado em React, Next.js e tecnologias modernas.",
  keywords: ["desenvolvedor", "full stack", "react", "nextjs", "javascript", "typescript"],
  authors: [{ name: "Henrique Monteiro Cardoso" }],
  openGraph: {
    title: "Portfólio - Desenvolvedor Full Stack",
    description: "Portfólio profissional de desenvolvedor full stack",
    type: "website",
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
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <AnimationProvider>
              <Suspense fallback={<div>Loading...</div>}>
                <div className="flex min-h-screen flex-col">
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
                <Analytics />
              </Suspense>
            </AnimationProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
