"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useLanguage } from "@/components/language-provider"

export function TestimonialsSection() {
  const { language } = useLanguage()

  const content = {
    pt: {
      title: "Depoimentos",
      subtitle: "Feedback profissional de colaboração técnica",
      items: [
        {
          quote:
            "Henrique demonstrou excelente capacidade de transformar requisitos complexos em soluções técnicas estáveis e de fácil manutenção.",
          name: "Colega de Projeto",
          role: "Engenharia de Software",
        },
        {
          quote:
            "Comunicação clara, organização e foco em resultado. Entregas com ótima qualidade técnica e visão de negócio.",
          name: "Liderança Técnica",
          role: "Tech Lead",
        },
      ],
    },
    en: {
      title: "Testimonials",
      subtitle: "Professional feedback on technical collaboration",
      items: [
        {
          quote:
            "Henrique showed excellent ability to turn complex requirements into stable and maintainable technical solutions.",
          name: "Project Peer",
          role: "Software Engineering",
        },
        {
          quote: "Clear communication, organization and outcome focus. Deliveries with strong technical quality and business vision.",
          name: "Technical Leadership",
          role: "Tech Lead",
        },
      ],
    },
  }

  const t = content[language]

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center gradient-text mb-4">{t.title}</h2>
          <p className="text-center text-muted-foreground mb-10">{t.subtitle}</p>

          <div className="grid md:grid-cols-2 gap-6">
            {t.items.map((item) => (
              <Card key={item.quote}>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-5">“{item.quote}”</p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{item.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
