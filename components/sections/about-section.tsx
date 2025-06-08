"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Users, Target, BookOpen } from "lucide-react"

export function AboutSection() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const values = [
    {
      icon: Code,
      title: "Desenvolvimento Full Stack",
      description: "Experiência em Java, JavaScript, TypeScript, Python, C++, C# e tecnologias web",
    },
    {
      icon: Users,
      title: "Gestão e Administração",
      description: "Sólida experiência em administração, suporte técnico e atendimento ao cliente",
    },
    {
      icon: Target,
      title: "Foco em Resultados",
      description: "Comunicação, negociação e trabalho colaborativo para melhoria contínua",
    },
    {
      icon: BookOpen,
      title: "Aprendizado Contínuo",
      description: "Estudante de ADS com múltiplas certificações e formação em constante evolução",
    },
  ]

  return (
    <section id="about" className="py-20 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Sobre Mim</h2>
          <p className="text-muted-foreground max-w-4xl mx-auto text-lg leading-relaxed">
            Meu conjunto de habilidades reflete uma sólida experiência tanto em áreas técnicas, como administração, TI e
            suporte ao cliente, quanto em aspectos comportamentais que envolvem comunicação, negociação e trabalho
            colaborativo. A combinação dessas competências me permite não apenas gerenciar processos administrativos e
            operacionais, mas também desempenhar um papel chave no desenvolvimento de pessoas e na melhoria contínua da
            eficiência organizacional.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <value.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
