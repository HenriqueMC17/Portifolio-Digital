import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/contexts/language-context"
import { ScrollProgressIndicator } from "@/components/scroll-progress-indicator"
import { Analytics } from "@/components/analytics"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Henrique Monteiro Cardoso | Desenvolvedor Full Stack",
  description:
    "Sou um estudante dedicado e apaixonado por tecnologia. Acredito que a combinação de conhecimento técnico e sensibilidade humana pode criar soluções inovadoras que impactam positivamente a sociedade. Aqui, compartilho meus projetos, ideias e experiências que refletem essa visão.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <ScrollProgressIndicator />
            <div className="flex min-h-screen flex-col">
              <Header />
              <Suspense>
                <main className="flex-1">{children}</main>
              </Suspense>
              <Footer />
            </div>
            <Analytics />
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
