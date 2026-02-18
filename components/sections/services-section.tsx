"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Target, ShieldCheck, Rocket, MessageSquareText, TrendingUp } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const valueData = {
  pt: {
    title: "Proposta de Valor",
    subtitle: "O que entrego em projetos e produtos digitais",
    items: [
      { icon: Target, title: "Soluções com impacto real", description: "Entrega orientada a resultados concretos e mensuráveis." },
      { icon: Rocket, title: "Arquitetura organizada e escalável", description: "Base técnica preparada para evolução contínua." },
      { icon: ShieldCheck, title: "Foco em performance e segurança", description: "Confiabilidade, estabilidade e proteção desde o início." },
      { icon: MessageSquareText, title: "Comunicação técnica clara", description: "Alinhamento constante entre negócio, produto e tecnologia." },
      { icon: TrendingUp, title: "Evolução contínua", description: "Aprimoramento incremental baseado em aprendizado prático." },
    ],
  },
  en: {
    title: "Value Proposition",
    subtitle: "What I deliver in projects and digital products",
    items: [
      { icon: Target, title: "Solutions with real impact", description: "Delivery oriented to concrete and measurable outcomes." },
      { icon: Rocket, title: "Organized and scalable architecture", description: "Technical foundation ready for continuous evolution." },
      { icon: ShieldCheck, title: "Performance and security focus", description: "Reliability, stability and protection from day one." },
      { icon: MessageSquareText, title: "Clear technical communication", description: "Continuous alignment across business, product and engineering." },
      { icon: TrendingUp, title: "Continuous evolution", description: "Incremental improvement based on practical learning." },
    ],
  },
}

export function ServicesSection() {
  const { language } = useLanguage()
  const t = valueData[language]

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.items.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="pt-6">
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
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
