"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Radar, Wrench, Telescope } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function MethodologySection() {
  const { language } = useLanguage()

  const content = {
    pt: {
      title: "Radar Tecnológico",
      subtitle: "Tecnologias organizadas por estágio de adoção",
      stages: [
        { icon: Radar, title: "Dominando", tone: "default" as const, items: ["Java", "JavaScript", "SQL", "HTML/CSS"] },
        { icon: Wrench, title: "Adotando", tone: "secondary" as const, items: ["TypeScript", "React", "Next.js"] },
        {
          icon: Telescope,
          title: "Explorando",
          tone: "outline" as const,
          items: ["Arquitetura avançada", "Performance web", "IA aplicada"],
        },
      ],
    },
    en: {
      title: "Technology Radar",
      subtitle: "Technologies organized by adoption stage",
      stages: [
        { icon: Radar, title: "Mastering", tone: "default" as const, items: ["Java", "JavaScript", "SQL", "HTML/CSS"] },
        { icon: Wrench, title: "Adopting", tone: "secondary" as const, items: ["TypeScript", "React", "Next.js"] },
        { icon: Telescope, title: "Exploring", tone: "outline" as const, items: ["Advanced architecture", "Web performance", "Applied AI"] },
      ],
    },
  }

  const t = content[language]

  return (
    <section id="methodology" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold text-center gradient-text mb-4">{t.title}</h2>
            <p className="text-center text-muted-foreground mb-12">{t.subtitle}</p>

            <div className="grid md:grid-cols-3 gap-6">
              {t.stages.map((stage) => (
                <Card key={stage.title}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <stage.icon className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">{stage.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {stage.items.map((item) => (
                        <Badge key={item} variant={stage.tone}>
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
