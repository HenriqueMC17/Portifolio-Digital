"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Layers, Workflow, Cog, GraduationCap, ShieldCheck } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function AboutSection() {
  const { language } = useLanguage()

  const content = {
    pt: {
      title: "Sobre Mim",
      description:
        "Sou desenvolvedor com experiência prática em desenvolvimento de sistemas, automações, integrações e soluções voltadas à eficiência operacional. Atuo na construção de aplicações web e soluções sob medida utilizando Java, JavaScript, TypeScript, Python, C#, SQL e tecnologias modernas de front-end e back-end.",
      focus: "Meu foco está em criar soluções bem estruturadas, com código limpo, escalável e sustentável.",
      areas: [
        "Desenvolvimento Full Stack",
        "Integração de sistemas",
        "Automação com planilhas e scripts",
        "Sistemas educacionais",
        "Suporte técnico especializado",
        "Otimização de processos",
      ],
      pillars: [
        { icon: Layers, title: "Arquitetura organizada", description: "Estrutura técnica previsível e escalável." },
        { icon: Workflow, title: "Impacto real", description: "Soluções técnicas voltadas a resultado de negócio." },
        { icon: ShieldCheck, title: "Performance e segurança", description: "Confiabilidade como requisito de base." },
        { icon: Cog, title: "Execução prática", description: "Implementação orientada a eficiência operacional." },
        { icon: GraduationCap, title: "Evolução contínua", description: "Aprendizado aplicado em produção." },
      ],
    },
    en: {
      title: "About Me",
      description:
        "I am a developer with hands-on experience in systems development, automations, integrations and solutions focused on operational efficiency. I build web applications and tailored solutions using Java, JavaScript, TypeScript, Python, C#, SQL and modern front-end and back-end technologies.",
      focus: "My focus is to deliver well-structured solutions with clean, scalable and sustainable code.",
      areas: [
        "Full Stack Development",
        "Systems Integration",
        "Spreadsheet and script automation",
        "Educational systems",
        "Specialized technical support",
        "Process optimization",
      ],
      pillars: [
        { icon: Layers, title: "Organized architecture", description: "Predictable and scalable technical structure." },
        { icon: Workflow, title: "Real impact", description: "Technical solutions aligned with business outcomes." },
        { icon: ShieldCheck, title: "Performance and security", description: "Reliability as a baseline requirement." },
        { icon: Cog, title: "Practical execution", description: "Implementation focused on operational efficiency." },
        { icon: GraduationCap, title: "Continuous growth", description: "Learning applied in production." },
      ],
    },
  }

  const t = content[language]

  return (
    <section id="about" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold text-center gradient-text mb-4">{t.title}</h2>
            <p className="text-center text-muted-foreground max-w-4xl mx-auto mb-4">{t.description}</p>
            <p className="text-center text-foreground font-medium max-w-3xl mx-auto mb-10">{t.focus}</p>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">{language === "pt" ? "Experiência prática" : "Practical Experience"}</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                    {t.areas.map((area) => (
                      <li key={area}>{area}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="grid sm:grid-cols-2 gap-4">
                {t.pillars.map((pillar) => (
                  <Card key={pillar.title}>
                    <CardContent className="pt-6">
                      <pillar.icon className="h-6 w-6 text-primary mb-3" />
                      <h4 className="font-semibold mb-1">{pillar.title}</h4>
                      <p className="text-sm text-muted-foreground">{pillar.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
