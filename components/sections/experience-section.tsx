"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Building, BookOpen } from "lucide-react"

const experiences = [
  {
    id: 1,
    title: "Auxiliar Comercial",
    company: "CCBEU Sorocaba - Centro Cultural Brasil - Estados Unidos",
    location: "Sorocaba, São Paulo, Brasil",
    period: "Fevereiro 2025 - Presente (7 meses)",
    description:
      "Atuo no atendimento digital via WhatsApp, realizando o primeiro contato com leads e garantindo o correto registro das interações no sistema Bitrix. Responsável pela atualização das planilhas de atendimentos receptivos e pelo acompanhamento dos testes de nível.",
    responsibilities: [
      "Atendimento digital via WhatsApp e gestão de leads",
      "Controle de vendas e emissão de boletos",
      "Gestão de matrículas no sistema DKSoft",
      "Elaboração de relatórios gerenciais e campanhas de e-mail marketing",
      "Suporte operacional à equipe comercial",
      "Treinamentos e implementações no sistema DKSoft",
    ],
    technologies: ["Bitrix", "DKSoft", "WhatsApp Business", "Excel", "E-mail Marketing"],
  },
  {
    id: 2,
    title: "Auxiliar Pedagógico",
    company: "CCBEU Sorocaba - Centro Cultural Brasil - Estados Unidos",
    location: "Sorocaba, São Paulo, Brasil",
    period: "Fevereiro 2025 - Abril 2025 (3 meses)",
    description:
      "Desenvolvi e adaptei planilhas para organização, monitoramento e análise de dados acadêmicos e administrativos de alunos. Realizei atendimento personalizado aos alunos, coordenando o agendamento de tutorias e reposições.",
    responsibilities: [
      "Desenvolvimento de planilhas para análise de dados acadêmicos",
      "Atendimento personalizado e coordenação de tutorias",
      "Gestão de comunicações institucionais por e-mail",
      "Supervisão da carteira de alunos EAD",
      "Estruturação de grupos no WhatsApp",
      "Conferência diária das aulas ministradas",
    ],
    technologies: ["Excel", "WhatsApp", "E-mail", "Sistemas EAD"],
  },
  {
    id: 3,
    title: "Aprendiz Auxiliar Administrativo II - SSMA",
    company: "ASSA ABLOY Group",
    location: "Porto Feliz, São Paulo, Brasil",
    period: "Junho 2024 - Dezembro 2024 (7 meses)",
    description:
      "Prestava suporte nas atividades administrativas da área de Saúde, Segurança e Meio Ambiente (SSMA), garantindo a execução eficaz de processos relacionados à gestão de EPIs, documentação de segurança e controles internos.",
    responsibilities: [
      "Gerenciamento e organização de planilhas e formulários de EPIs",
      "Preparação e organização de treinamentos de segurança (SIPAT)",
      "Acompanhamento de indicadores de desempenho SSMA",
      "Apoio na entrega e troca de EPIs e fardamentos",
      "Facilitação da comunicação entre setores",
      "Suporte em auditorias internas",
    ],
    technologies: ["Excel", "Intranet", "RELATE", "Sistemas de Gestão SSMA"],
    recognition:
      "Reconhecimento pela forma de abordagem com os colaboradores na conscientização do uso correto de EPIs nas áreas produtivas",
  },
  {
    id: 4,
    title: "Auxiliar Comercial",
    company: "CCBEU Sorocaba - Centro Cultural Brasil - Estados Unidos",
    location: "Sorocaba, São Paulo, Brasil",
    period: "Janeiro 2023 - Janeiro 2024 (1 ano 1 mês)",
    description:
      "Oferecia suporte à equipe Comercial no uso do Sistema Integrado DKSoft e conduzia treinamentos mensais para aprimorar a competência da equipe.",
    responsibilities: [
      "Suporte e treinamentos no Sistema DKSoft",
      "Migração de informações entre sistemas",
      "Gestão do Sistema Sponte (Cadastro, Contratos, Financeiro)",
      "Cadastros de alunos e baixa de boletos",
      "Apoio às atividades escolares",
      "Recepção de pais e alunos",
    ],
    technologies: ["DKSoft", "Sponte", "Excel", "Sistemas de Gestão Escolar"],
  },
]

const education = [
  {
    institution: "Centro Universitário Facens",
    degree: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
    period: "Fevereiro 2025 - Julho 2027",
    status: "Em andamento",
  },
  {
    institution: "Colégio Objetivo Zona Norte",
    degree: "Ensino Médio Completo",
    period: "Janeiro 2022 - Dezembro 2024",
    status: "Concluído",
  },
]

export function ExperienceSection() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  return (
    <section id="experience" className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Experiência & Formação</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Minha jornada profissional e acadêmica, com experiências que moldaram minha carreira em tecnologia e
            administração.
          </p>
        </motion.div>

        {/* Experiência Profissional */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 flex items-center">
            <Building className="h-6 w-6 mr-3 text-primary" />
            Experiência Profissional
          </h3>

          <div className="space-y-6">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{experience.title}</h4>
                        <p className="text-primary font-medium">{experience.company}</p>
                      </div>
                      <div className="flex flex-col lg:items-end text-sm text-muted-foreground mt-2 lg:mt-0">
                        <div className="flex items-center mb-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {experience.period}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {experience.location}
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4">{experience.description}</p>

                    {experience.recognition && (
                      <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <p className="text-sm text-green-800 dark:text-green-200">
                          <strong>Reconhecimento:</strong> {experience.recognition}
                        </p>
                      </div>
                    )}

                    <div className="mb-4">
                      <h5 className="text-sm font-medium mb-2">Principais responsabilidades:</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {experience.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2 flex-shrink-0" />
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Formação Acadêmica */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 flex items-center">
            <BookOpen className="h-6 w-6 mr-3 text-primary" />
            Formação Acadêmica
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: experiences.length * 0.1 + index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-lg">{edu.degree}</h4>
                      <Badge variant={edu.status === "Em andamento" ? "default" : "secondary"}>{edu.status}</Badge>
                    </div>
                    <p className="text-primary font-medium mb-2">{edu.institution}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {edu.period}
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
