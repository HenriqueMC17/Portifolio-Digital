"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useLanguage } from "@/contexts/language-context"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase } from "lucide-react"

// Dados de experiência de Henrique
const experiences = [
  {
    id: 1,
    role: "Auxiliar Comercial",
    company: "CCBEU Sorocaba - Centro Cultural Brasil - Estados Unidos",
    period: "Fevereiro 2025 - Presente",
    description:
      "Verificação diária de vendas, geração de boletos, manutenção de planilhas, acompanhamento de testes de nível, monitoramento de vendas e contratos, gerenciamento de leads, revisão de carteira de clientes, suporte à equipe comercial, auditorias de aparelhos e recursos, e atuação como ponto focal do sistema DKSoft.",
    achievements: [
      "Implementação de melhorias no sistema de gestão de vendas",
      "Otimização do processo de distribuição de leads",
      "Treinamento da equipe no uso do sistema DKSoft",
    ],
    technologies: ["DKSoft", "Excel", "Gestão de Vendas", "Atendimento ao Cliente"],
  },
  {
    id: 2,
    role: "Auxiliar Pedagógico",
    company: "CCBEU Sorocaba - Centro Cultural Brasil - Estados Unidos",
    period: "Fevereiro 2025 - Abril 2025",
    description:
      "Desenvolvimento e adaptação de planilhas para organização de dados acadêmicos, atendimento a alunos, coordenação de tutorias e reposições, gerenciamento de comunicações institucionais, atualização da grade horária, supervisão da carteira de alunos EAD, suporte à Diretoria Pedagógica, estruturação de grupos no WhatsApp, controle de registros de alunos cancelados, e conferência diária de aulas.",
    achievements: [
      "Desenvolvimento de sistema de acompanhamento de alunos EAD",
      "Otimização do processo de agendamento de tutorias",
      "Implementação de melhorias na comunicação institucional",
    ],
    technologies: ["Excel", "Gestão Educacional", "Comunicação", "Organização"],
  },
  {
    id: 3,
    role: "Aprendiz Auxiliar Administrativo II",
    company: "ASSA ABLOY Group",
    period: "Junho 2024 - Dezembro 2024",
    description:
      "Suporte nas atividades administrativas da área de Saúde, Segurança e Meio Ambiente (SSMA), gerenciamento de planilhas e formulários, auxílio na preparação de treinamentos de segurança, acompanhamento de indicadores de desempenho, apoio na entrega e troca de EPIs, facilitação da comunicação entre setores, auxílio em verificações e inventários, e suporte em auditorias internas.",
    achievements: [
      "Reconhecimento pela abordagem na conscientização do uso correto de EPIs",
      "Implementação de melhorias nos processos de controle de EPIs",
      "Otimização do sistema de documentação de segurança",
    ],
    technologies: ["Excel", "Intranet", "RELATE", "Gestão de Segurança"],
  },
  {
    id: 4,
    role: "Auxiliar Comercial",
    company: "CCBEU Sorocaba - Centro Cultural Brasil - Estados Unidos",
    period: "Janeiro 2023 - Janeiro 2024",
    description:
      "Suporte à equipe Comercial no uso do Sistema Integrado DKSoft, condução de treinamentos mensais, resolução de problemas relacionados ao DKSoft, migração de informações entre sistemas, resolução de questões no Sistema Integrado Sponte, cadastro de alunos, baixa de boletos, cotação para compra de insumos, e apoio às atividades escolares.",
    achievements: [
      "Implementação de melhorias no processo de migração de dados",
      "Otimização do uso do Sistema Integrado DKSoft",
      "Desenvolvimento de treinamentos eficazes para a equipe comercial",
    ],
    technologies: ["DKSoft", "Sponte", "Gestão Comercial", "Treinamento"],
  },
]

export function ExperienceSection() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading title={t("experience.title")} subtitle={t("experience.subtitle")} centered />

        <div className="mt-12 relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-border" />

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative md:w-1/2 ${index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-0 top-6 w-6 h-6 rounded-full bg-primary -ml-3 md:-ml-3" />

                {/* Card with offset for timeline */}
                <div className="ml-8 md:ml-0 md:mx-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold">{exp.role}</h3>
                          <div className="flex items-center text-muted-foreground">
                            <Briefcase className="h-4 w-4 mr-1" />
                            <span>{exp.company}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="mt-2 md:mt-0 self-start">
                          {exp.period}
                        </Badge>
                      </div>

                      <p className="mb-4">{exp.description}</p>

                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Conquistas:</h4>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Tecnologias:</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <Badge key={i} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
