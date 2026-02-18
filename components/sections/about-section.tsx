"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Code,
  Lightbulb,
  Rocket,
  Users,
  MapPin,
  GraduationCap,
  Target,
  Shield,
  Zap,
  MessageSquare,
  TrendingUp,
} from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"

export function AboutSection() {
  const { language } = useLanguage()

  const content = {
    pt: {
      title: "Sobre Mim",
      description:
        "Sou desenvolvedor com experiencia pratica em desenvolvimento de sistemas, automacoes, integracoes e solucoes voltadas a eficiencia operacional. Atuo na construcao de aplicacoes web e solucoes sob medida utilizando Java, JavaScript, TypeScript, Python, C#, SQL e tecnologias modernas de front-end e back-end.",
      location: "Sorocaba, SP",
      education: "Tecnologo em ADS - Facens",
      experience: [
        "Desenvolvimento Full Stack",
        "Integracao de sistemas",
        "Automacao com planilhas e scripts",
        "Sistemas educacionais",
        "Suporte tecnico especializado",
        "Otimizacao de processos",
      ],
      experienceLabel: "Experiencia em:",
      focusLabel: "Meu foco esta em criar solucoes bem estruturadas, com codigo limpo, escalavel e sustentavel.",
      proposalTitle: "Proposta de Valor",
      proposalSubtitle: "O que entrego:",
      proposals: [
        {
          icon: Target,
          title: "Solucoes tecnicas com impacto real",
          description: "Foco em resultados mensuráveis e resolucao de problemas concretos",
        },
        {
          icon: Code,
          title: "Arquitetura organizada e escalavel",
          description: "Codigo limpo, modular e preparado para crescimento",
        },
        {
          icon: Shield,
          title: "Foco em performance e seguranca",
          description: "Aplicacoes rapidas, estaveis e seguras por padrao",
        },
        {
          icon: MessageSquare,
          title: "Clareza na comunicacao tecnica",
          description: "Traducao eficiente entre necessidades de negocio e solucoes tecnicas",
        },
        {
          icon: TrendingUp,
          title: "Evolucao continua",
          description: "Aprendizado pratico constante e adaptacao a novas tecnologias",
        },
      ],
      values: [
        {
          icon: Code,
          title: "Desenvolvimento Full Stack",
          description: "Java, JavaScript, TypeScript, Python, C#, SQL e frameworks modernos",
        },
        {
          icon: Lightbulb,
          title: "Integracao & Automacao",
          description: "Integracao de sistemas, automacao com VBA, Apps Script e scripts personalizados",
        },
        {
          icon: Rocket,
          title: "Inovacao Continua",
          description: "Sempre buscando novas tecnologias e solucoes criativas para problemas reais",
        },
        {
          icon: Users,
          title: "Trabalho em Equipe",
          description: "Comunicacao efetiva, pensamento analitico e colaboracao para resultados",
        },
      ],
    },
    en: {
      title: "About Me",
      description:
        "I am a developer with practical experience in systems development, automation, integrations and solutions focused on operational efficiency. I work on building web applications and custom solutions using Java, JavaScript, TypeScript, Python, C#, SQL and modern front-end and back-end technologies.",
      location: "Sorocaba, SP",
      education: "Systems Analysis and Development - Facens",
      experience: [
        "Full Stack Development",
        "Systems Integration",
        "Spreadsheet and script automation",
        "Educational systems",
        "Specialized technical support",
        "Process optimization",
      ],
      experienceLabel: "Experience in:",
      focusLabel: "My focus is on creating well-structured solutions, with clean, scalable and sustainable code.",
      proposalTitle: "Value Proposition",
      proposalSubtitle: "What I deliver:",
      proposals: [
        {
          icon: Target,
          title: "Technical solutions with real impact",
          description: "Focus on measurable results and solving concrete problems",
        },
        {
          icon: Code,
          title: "Organized and scalable architecture",
          description: "Clean, modular code prepared for growth",
        },
        {
          icon: Shield,
          title: "Focus on performance and security",
          description: "Fast, stable and secure applications by default",
        },
        {
          icon: MessageSquare,
          title: "Clear technical communication",
          description: "Efficient translation between business needs and technical solutions",
        },
        {
          icon: TrendingUp,
          title: "Continuous evolution",
          description: "Constant practical learning and adaptation to new technologies",
        },
      ],
      values: [
        {
          icon: Code,
          title: "Full Stack Development",
          description: "Java, JavaScript, TypeScript, Python, C#, SQL and modern frameworks",
        },
        {
          icon: Lightbulb,
          title: "Integration & Automation",
          description: "Systems integration, automation with VBA, Apps Script and custom scripts",
        },
        {
          icon: Rocket,
          title: "Continuous Innovation",
          description: "Always seeking new technologies and creative solutions for real problems",
        },
        {
          icon: Users,
          title: "Teamwork",
          description: "Effective communication, analytical thinking and collaboration for results",
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

            {/* Bio Section */}
            <div className="max-w-3xl mx-auto mb-8">
              <p className="text-center text-muted-foreground leading-relaxed mb-4">{t.description}</p>

              <div className="flex flex-wrap justify-center gap-3 mb-4">
                <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {t.location}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1">
                  <GraduationCap className="h-3.5 w-3.5" />
                  {t.education}
                </Badge>
              </div>

              <p className="text-sm font-medium text-foreground text-center mb-3">{t.experienceLabel}</p>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {t.experience.map((item, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
              <p className="text-center text-sm text-primary font-medium">{t.focusLabel}</p>
            </div>

            {/* Core Values / Expertise */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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

            {/* Value Proposition */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-2">{t.proposalTitle}</h3>
              <p className="text-muted-foreground">{t.proposalSubtitle}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.proposals.map((proposal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 group">
                    <CardContent className="pt-6">
                      <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
                        <proposal.icon className="h-6 w-6 text-accent-foreground" />
                      </div>
                      <h4 className="text-lg font-semibold mb-1.5">{proposal.title}</h4>
                      <p className="text-muted-foreground text-sm">{proposal.description}</p>
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
