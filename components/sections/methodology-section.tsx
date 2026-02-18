"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Search, PenTool, Code2, Rocket } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const methodologyData = {
  pt: {
    title: "Processo de Trabalho",
    subtitle: "Metodologia agil e transparente para entregar resultados excepcionais",
    steps: [
      {
        icon: Search,
        number: "01",
        title: "Descoberta & Planejamento",
        description:
          "Analise profunda das necessidades, definicao de requisitos, arquitetura da solucao e planejamento de sprints.",
      },
      {
        icon: PenTool,
        number: "02",
        title: "Design & Prototipagem",
        description:
          "Wireframes, prototipos interativos e validacao do UX antes de iniciar o desenvolvimento.",
      },
      {
        icon: Code2,
        number: "03",
        title: "Desenvolvimento & Testes",
        description:
          "Codigo limpo com entregas incrementais, testes automatizados e revisoes constantes de qualidade.",
      },
      {
        icon: Rocket,
        number: "04",
        title: "Deploy & Suporte",
        description:
          "Deploy otimizado, monitoramento de performance e suporte continuo para garantir estabilidade.",
      },
    ],
  },
  en: {
    title: "Work Process",
    subtitle: "Agile and transparent methodology to deliver exceptional results",
    steps: [
      {
        icon: Search,
        number: "01",
        title: "Discovery & Planning",
        description:
          "Deep analysis of needs, requirements definition, solution architecture and sprint planning.",
      },
      {
        icon: PenTool,
        number: "02",
        title: "Design & Prototyping",
        description:
          "Wireframes, interactive prototypes and UX validation before starting development.",
      },
      {
        icon: Code2,
        number: "03",
        title: "Development & Testing",
        description:
          "Clean code with incremental deliveries, automated testing and constant quality reviews.",
      },
      {
        icon: Rocket,
        number: "04",
        title: "Deploy & Support",
        description:
          "Optimized deploy, performance monitoring and continuous support to ensure stability.",
      },
    ],
  },
}

export function MethodologySection() {
  const { language } = useLanguage()
  const t = methodologyData[language]

  return (
    <section id="methodology" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">{t.title}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">{t.subtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <step.icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-mono text-primary font-bold tracking-wider">{step.number}</span>
                          <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
