"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Code, Lightbulb, Rocket, Users } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"

export function AboutSection() {
  const { language } = useLanguage()

  const content = {
    pt: {
      title: "Sobre Mim",
      description:
        "Meu conjunto de habilidades reflete uma sólida experiência tanto em áreas técnicas, como administração, TI e suporte ao cliente, quanto em aspectos comportamentais que envolvem comunicação, negociação e trabalho colaborativo. A combinação dessas competências me permite não apenas gerenciar processos administrativos e operacionais, mas também desempenhar um papel chave no desenvolvimento de pessoas e na melhoria contínua da eficiência organizacional.",
      location: "Nova Sorocaba, SP",
      education: "Tecnólogo em ADS - Facens",
      values: [
        {
          icon: Code,
          title: "Desenvolvimento Full Stack",
          description: "Java, JavaScript, TypeScript, Python, C++, C# e frameworks modernos",
        },
        {
          icon: Lightbulb,
          title: "Administração & TI",
          description: "Gestão de processos, sistemas integrados e suporte técnico",
        },
        {
          icon: Rocket,
          title: "Inovação Contínua",
          description: "Sempre buscando novas tecnologias e soluções criativas",
        },
        {
          icon: Users,
          title: "Trabalho em Equipe",
          description: "Comunicação efetiva e colaboração para resultados extraordinários",
        },
      ],
    },
    en: {
      title: "About Me",
      description:
        "My skill set reflects solid experience in both technical areas such as administration, IT and customer support, as well as behavioral aspects involving communication, negotiation and collaborative work. The combination of these skills allows me not only to manage administrative and operational processes, but also to play a key role in people development and continuous improvement of organizational efficiency.",
      location: "Nova Sorocaba, SP",
      education: "Systems Analysis and Development - Facens",
      values: [
        {
          icon: Code,
          title: "Full Stack Development",
          description: "Java, JavaScript, TypeScript, Python, C++, C# and modern frameworks",
        },
        {
          icon: Lightbulb,
          title: "Administration & IT",
          description: "Process management, integrated systems and technical support",
        },
        {
          icon: Rocket,
          title: "Continuous Innovation",
          description: "Always seeking new technologies and creative solutions",
        },
        {
          icon: Users,
          title: "Teamwork",
          description: "Effective communication and collaboration for extraordinary results",
        },
      ],
    },
  }

  const t = content[language]

  return (
    <section id="about" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center gradient-text mb-4">{t.title}</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">{t.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1">
                    <CardContent className="pt-6">
                      <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                        <value.icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground text-sm">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
