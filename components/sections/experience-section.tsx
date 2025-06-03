"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useLanguage } from "@/contexts/language-context"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, TrendingUp, Users, Award } from "lucide-react"

// Dados de experiência de Henrique - ordenados do mais recente para o mais antigo
const experiences = [
  {
    id: 1,
    role: "Auxiliar Comercial",
    company: "CCBEU Sorocaba - Centro Cultural Brasil - Estados Unidos",
    period: "Fevereiro 2025 - Presente",
    description:
      "Responsável pela gestão completa do ciclo comercial, desde a prospecção até o fechamento de vendas. Atuo como especialista no sistema DKSoft, oferecendo suporte técnico e treinamento para toda a equipe comercial.",
    detailedResponsibilities: [
      "Verificação e análise diária de vendas com relatórios de performance",
      "Geração automatizada de boletos e controle de inadimplência",
      "Manutenção e otimização de planilhas de controle comercial",
      "Coordenação de testes de nível para novos alunos",
      "Monitoramento de KPIs de vendas e contratos",
      "Gestão estratégica de leads e pipeline de vendas",
      "Revisão e atualização da carteira de clientes ativos",
      "Suporte técnico especializado à equipe comercial",
      "Auditorias de aparelhos e recursos tecnológicos",
      "Atuação como ponto focal e especialista do sistema DKSoft",
    ],
    achievements: [
      "Implementação de melhorias no sistema de gestão que resultaram em 25% de aumento na eficiência",
      "Otimização do processo de distribuição de leads, reduzindo tempo de resposta em 40%",
      "Treinamento de 15+ membros da equipe no uso avançado do sistema DKSoft",
      "Desenvolvimento de relatórios automatizados que economizam 10h/semana da equipe",
    ],
    technologies: ["DKSoft", "Excel Avançado", "Gestão de Vendas", "CRM", "Atendimento ao Cliente", "Power BI"],
    metrics: {
      teamSize: "15+ pessoas treinadas",
      efficiency: "25% aumento na eficiência",
      timeReduction: "40% redução no tempo de resposta",
    },
  },
  {
    id: 2,
    role: "Auxiliar Pedagógico",
    company: "CCBEU Sorocaba - Centro Cultural Brasil - Estados Unidos",
    period: "Fevereiro 2024 - Abril 2024",
    description:
      "Responsável pela gestão acadêmica e suporte pedagógico, com foco em otimização de processos educacionais e acompanhamento de alunos EAD. Desenvolvi soluções tecnológicas para melhorar a experiência educacional.",
    detailedResponsibilities: [
      "Desenvolvimento e adaptação de planilhas avançadas para organização de dados acadêmicos",
      "Atendimento personalizado a alunos com dúvidas acadêmicas e administrativas",
      "Coordenação e agendamento de tutorias e aulas de reposição",
      "Gerenciamento de comunicações institucionais multicanal",
      "Atualização e manutenção da grade horária acadêmica",
      "Supervisão ativa da carteira de 200+ alunos EAD",
      "Suporte direto à Diretoria Pedagógica em projetos estratégicos",
      "Estruturação e moderação de grupos no WhatsApp por turma",
      "Controle rigoroso de registros de alunos cancelados e transferidos",
      "Conferência diária de aulas e presença de professores",
    ],
    achievements: [
      "Desenvolvimento de sistema de acompanhamento que aumentou retenção de alunos EAD em 30%",
      "Otimização do processo de agendamento de tutorias, reduzindo conflitos em 50%",
      "Implementação de melhorias na comunicação que aumentaram satisfação em 35%",
      "Criação de dashboard de acompanhamento acadêmico para a diretoria",
    ],
    technologies: [
      "Excel Avançado",
      "Gestão Educacional",
      "WhatsApp Business",
      "Sistemas Acadêmicos",
      "Comunicação Digital",
    ],
    metrics: {
      studentsManaged: "200+ alunos EAD",
      retention: "30% aumento na retenção",
      satisfaction: "35% aumento na satisfação",
    },
  },
  {
    id: 3,
    role: "Aprendiz Auxiliar Administrativo II",
    company: "ASSA ABLOY Group",
    period: "Junho 2024 - Dezembro 2024",
    description:
      "Atuação estratégica na área de Saúde, Segurança e Meio Ambiente (SSMA), com foco em compliance, gestão de EPIs e implementação de melhorias nos processos de segurança. Reconhecido pela excelência na conscientização sobre segurança.",
    detailedResponsibilities: [
      "Suporte especializado nas atividades administrativas da área SSMA",
      "Gerenciamento de planilhas de controle de EPIs e formulários de segurança",
      "Auxílio na preparação e execução de treinamentos de segurança",
      "Acompanhamento de indicadores de desempenho de segurança (KPIs)",
      "Gestão completa da entrega e troca de EPIs para 300+ funcionários",
      "Facilitação da comunicação entre setores sobre questões de segurança",
      "Execução de verificações e inventários de equipamentos de segurança",
      "Suporte técnico em auditorias internas e externas de segurança",
      "Desenvolvimento de materiais educativos sobre uso correto de EPIs",
    ],
    achievements: [
      "Reconhecimento oficial pela abordagem inovadora na conscientização do uso correto de EPIs",
      "Implementação de melhorias que reduziram acidentes de trabalho em 20%",
      "Otimização do sistema de documentação, aumentando eficiência em 40%",
      "Desenvolvimento de programa de conscientização que atingiu 100% dos funcionários",
    ],
    technologies: [
      "Excel Avançado",
      "Intranet Corporativa",
      "RELATE",
      "Gestão de Segurança",
      "Compliance",
      "Power Point",
    ],
    metrics: {
      employeesManaged: "300+ funcionários",
      accidentReduction: "20% redução em acidentes",
      coverage: "100% dos funcionários treinados",
    },
  },
  {
    id: 4,
    role: "Auxiliar Comercial",
    company: "CCBEU Sorocaba - Centro Cultural Brasil - Estados Unidos",
    period: "Janeiro 2023 - Janeiro 2024",
    description:
      "Primeira experiência na área comercial, focada em suporte técnico e treinamento da equipe. Responsável pela migração de sistemas e otimização de processos comerciais, estabelecendo as bases para futuras melhorias.",
    detailedResponsibilities: [
      "Suporte técnico especializado à equipe Comercial no Sistema Integrado DKSoft",
      "Condução de treinamentos mensais para equipe comercial (12 sessões/ano)",
      "Resolução de problemas técnicos complexos relacionados ao DKSoft",
      "Migração segura de informações entre sistemas legados e novos",
      "Resolução de questões críticas no Sistema Integrado Sponte",
      "Cadastro e atualização de dados de 500+ alunos",
      "Processamento e baixa de boletos bancários",
      "Cotação e compra de insumos para operação comercial",
      "Apoio logístico às atividades escolares e eventos",
    ],
    achievements: [
      "Implementação de melhorias no processo de migração que reduziram erros em 60%",
      "Otimização do uso do Sistema Integrado DKSoft, aumentando produtividade em 30%",
      "Desenvolvimento de 12 treinamentos eficazes que capacitaram toda a equipe comercial",
      "Estabelecimento de procedimentos padrão que são utilizados até hoje",
    ],
    technologies: ["DKSoft", "Sponte", "Gestão Comercial", "Treinamento", "Migração de Dados", "Excel"],
    metrics: {
      studentsRegistered: "500+ alunos cadastrados",
      errorReduction: "60% redução em erros",
      trainingSessions: "12 treinamentos realizados",
    },
  },
]

export function ExperienceSection() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
    rootMargin: "-100px 0px -50px 0px",
  })

  return (
    <section id="experience" className="py-20" ref={ref}>
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
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: inView ? index * 0.15 : 0 }}
                className={`relative md:w-1/2 ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute top-6 w-6 h-6 rounded-full bg-primary ${
                    index % 2 === 0 ? "md:right-0 md:-mr-3 left-0 -ml-3 md:left-auto" : "left-0 -ml-3"
                  }`}
                />

                {/* Card with offset for timeline */}
                <div className={`ml-8 ${index % 2 === 0 ? "md:mr-8 md:ml-0" : "md:ml-8"}`}>
                  <Card className="hover:shadow-lg transition-shadow duration-300">
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

                      <p className="mb-4 text-muted-foreground">{exp.description}</p>

                      {/* Metrics */}
                      {exp.metrics && (
                        <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                          <h4 className="font-medium mb-2 flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            Resultados Quantificáveis:
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            {Object.entries(exp.metrics).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="text-muted-foreground capitalize">
                                  {key.replace(/([A-Z])/g, " $1").toLowerCase()}:
                                </span>
                                <span className="font-medium text-primary">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Detailed Responsibilities */}
                      <div className="mb-4">
                        <h4 className="font-medium mb-2 flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          Principais Responsabilidades:
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground max-h-32 overflow-y-auto">
                          {exp.detailedResponsibilities.slice(0, 5).map((responsibility, i) => (
                            <li key={i}>{responsibility}</li>
                          ))}
                          {exp.detailedResponsibilities.length > 5 && (
                            <li className="text-primary cursor-pointer">
                              +{exp.detailedResponsibilities.length - 5} responsabilidades adicionais...
                            </li>
                          )}
                        </ul>
                      </div>

                      {/* Achievements */}
                      <div className="mb-4">
                        <h4 className="font-medium mb-2 flex items-center">
                          <Award className="h-4 w-4 mr-1" />
                          Principais Conquistas:
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="font-medium mb-2">Tecnologias & Ferramentas:</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
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
