"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useToast } from "@/hooks/use-toast"

export function ContactSection() {
  const { language } = useLanguage()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const content = {
    pt: {
      title: "Entre em Contato",
      subtitle: "Vamos conversar sobre seu próximo projeto",
      form: {
        name: "Nome",
        email: "Email",
        message: "Mensagem",
        send: "Enviar Mensagem",
        sending: "Enviando...",
      },
      info: [
        { icon: Mail, label: "Email", value: "contato@henrique.dev" },
        { icon: Phone, label: "Telefone", value: "+55 (11) 99999-9999" },
        { icon: MapPin, label: "Localização", value: "São Paulo, Brasil" },
      ],
      success: "Mensagem enviada!",
      successMessage: "Obrigado pelo contato. Responderei em breve.",
    },
    en: {
      title: "Get in Touch",
      subtitle: "Let's talk about your next project",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send Message",
        sending: "Sending...",
      },
      info: [
        { icon: Mail, label: "Email", value: "contact@henrique.dev" },
        { icon: Phone, label: "Phone", value: "+55 (11) 99999-9999" },
        { icon: MapPin, label: "Location", value: "São Paulo, Brazil" },
      ],
      success: "Message sent!",
      successMessage: "Thank you for contacting. I will respond soon.",
    },
  }

  const t = content[language]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: t.success,
        description: t.successMessage,
      })
      ;(e.target as HTMLFormElement).reset()
    }, 1500)
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center gradient-text mb-4">{t.title}</h2>
          <p className="text-center text-muted-foreground mb-12">{t.subtitle}</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{t.form.name}</CardTitle>
                <CardDescription>Preencha o formulário abaixo</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input placeholder={t.form.name} required />
                  <Input type="email" placeholder={t.form.email} required />
                  <Textarea placeholder={t.form.message} rows={5} required />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      t.form.sending
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        {t.form.send}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {t.info.map((item, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{item.label}</p>
                        <p className="text-muted-foreground">{item.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
