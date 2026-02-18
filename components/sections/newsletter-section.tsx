"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle, Loader2 } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useToast } from "@/hooks/use-toast"

export function NewsletterSection() {
  const { language } = useLanguage()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const content = {
    pt: {
      title: "Fique por dentro",
      subtitle: "Receba as últimas novidades, artigos e dicas diretamente no seu email",
      placeholder: "seu@email.com",
      button: "Inscrever-se",
      loading: "Inscrevendo...",
      success: "Inscrição confirmada!",
      successMessage: "Você receberá nossas novidades em breve.",
      errorMessage: "Erro ao se inscrever. Tente novamente.",
    },
    en: {
      title: "Stay updated",
      subtitle: "Receive the latest news, articles and tips directly in your email",
      placeholder: "your@email.com",
      button: "Subscribe",
      loading: "Subscribing...",
      success: "Subscription confirmed!",
      successMessage: "You will receive our news soon.",
      errorMessage: "Error subscribing. Try again.",
    },
  }

  const t = content[language]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      toast({
        title: t.success,
        description: t.successMessage,
      })

      setTimeout(() => {
        setIsSuccess(false)
        setEmail("")
      }, 3000)
    }, 1500)
  }

  return (
    <section id="newsletter" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-background/80 backdrop-blur-xl border border-white/10 shadow-lg rounded-2xl p-8 md:p-12 text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="h-8 w-8 text-primary" />
            </div>

            <h2 className="text-3xl font-bold gradient-text mb-4">{t.title}</h2>
            <p className="text-muted-foreground mb-8">{t.subtitle}</p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder={t.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
                disabled={isLoading || isSuccess}
              />
              <Button type="submit" disabled={isLoading || isSuccess} className="whitespace-nowrap">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {t.loading}
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {t.success}
                  </>
                ) : (
                  t.button
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
