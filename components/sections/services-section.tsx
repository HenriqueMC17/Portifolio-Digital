"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code2, Smartphone, Brain, Database, Settings, BarChart3 } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const servicesData = {
  pt: {
    title: "Servicos",
    subtitle: "Solucoes sob medida para transformar sua presenca digital",
    services: [
      {
        icon: Code2,
        title: "Desenvolvimento Web",
        description:
          "Aplicacoes web modernas com React, Next.js e TypeScript. Sites responsivos, rapidos e otimizados para SEO.",
      },
      {
        icon: Smartphone,
        title: "Aplicacoes Mobile",
        description:
          "Apps multiplataforma com React Native e tecnologias modernas. Experiencia nativa em iOS e Android.",
      },
      {
        icon: Brain,
        title: "Solucoes com IA",
        description:
          "Integracao de inteligencia artificial em projetos. Chatbots, automacoes e analise de dados inteligente.",
      },
      {
        icon: Database,
        title: "Backend & APIs",
        description:
          "APIs robustas com Node.js, Java e Python. Arquiteturas escalaveis e seguras para seus dados.",
      },
      {
        icon: Settings,
        title: "Suporte Tecnico & TI",
        description:
          "Gestao de infraestrutura, resolucao de problemas e suporte tecnico especializado para empresas.",
      },
      {
        icon: BarChart3,
        title: "Consultoria Digital",
        description:
          "Analise estrategica, otimizacao de processos e planejamento de transformacao digital para seu negocio.",
      },
    ],
  },
  en: {
    title: "Services",
    subtitle: "Custom solutions to transform your digital presence",
    services: [
      {
        icon: Code2,
        title: "Web Development",
        description:
          "Modern web applications with React, Next.js and TypeScript. Responsive, fast and SEO-optimized sites.",
      },
      {
        icon: Smartphone,
        title: "Mobile Applications",
        description:
          "Cross-platform apps with React Native and modern technologies. Native experience on iOS and Android.",
      },
      {
        icon: Brain,
        title: "AI Solutions",
        description:
          "Artificial intelligence integration in projects. Chatbots, automations and intelligent data analysis.",
      },
      {
        icon: Database,
        title: "Backend & APIs",
        description:
          "Robust APIs with Node.js, Java and Python. Scalable and secure architectures for your data.",
      },
      {
        icon: Settings,
        title: "IT & Technical Support",
        description:
          "Infrastructure management, problem-solving and specialized technical support for businesses.",
      },
      {
        icon: BarChart3,
        title: "Digital Consulting",
        description:
          "Strategic analysis, process optimization and digital transformation planning for your business.",
      },
    ],
  },
}

export function ServicesSection() {
  const { language } = useLanguage()
  const t = servicesData[language]

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
            {t.services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                  <CardContent className="pt-6">
                    <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
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
