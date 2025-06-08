"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Calendar, CheckCircle2, Shield, Code, Briefcase, Palette } from "lucide-react"

// Componente SectionHeading inline para evitar dependências externas
function SectionHeading({ title, subtitle, centered = false }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div ref={ref} className={`space-y-2 ${centered ? "text-center" : ""}`}>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold tracking-tight"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-muted-foreground"
      >
        {subtitle}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={inView ? { opacity: 1, width: centered ? "80px" : "60px" } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`h-1 bg-primary ${centered ? "mx-auto" : ""}`}
      />
    </div>
  )
}

// Dados completos de certificações organizados por categoria
const certificationsByCategory = {
  excel: [
    {
      id: 1,
      name: "Excel Profissionalizante e Especialista em Planilhas Eletrônicas",
      issuer: "Geração Futuro Aprendizagem",
      date: "Outubro 2024",
      status: "Ativo",
      description:
        "Certificação avançada em Excel, incluindo criação de planilhas, dashboards, gráficos e análise de dados.",
      skills: [
        "Criação de planilhas",
        "Operações computacionais",
        "Microsoft Office",
        "Dashboards",
        "Gráficos",
        "Análise de dados",
      ],
      credentialId: "GFA-2024-001",
      category: "Excel & Análise de Dados",
    },
    {
      id: 2,
      name: "Certificado de Excel",
      issuer: "CCBEU Sorocaba - Centro Cultural Brasil - Estados Unidos",
      date: "Outubro 2023",
      status: "Ativo",
      description: "Certificação em Excel com foco em criação de planilhas, gráficos e dashboards.",
      skills: [
        "Microsoft Excel",
        "Criação de planilhas",
        "Elaboração de gráficos",
        "Microsoft Office",
        "Dashboards",
        "Fórmulas",
      ],
      credentialId: "CCBEU-2023-EXC",
      category: "Excel & Análise de Dados",
    },
    {
      id: 3,
      name: "Excel Básico",
      issuer: "SENAI",
      date: "Fevereiro 2023",
      status: "Ativo",
      description: "Fundamentos do Excel: edição, formatação de dados, fórmulas básicas e criação de gráficos.",
      skills: ["Microsoft Excel", "Microsoft Office", "Fórmulas básicas", "Formatação", "Gráficos"],
      credentialId: "SENAI-2023-EXB",
      category: "Excel & Análise de Dados",
      details:
        "Editar dados no Excel, Formatar dados no Excel, Reconhecer a diferença entre Função e Fórmula, Utilizar as fórmulas de Soma, Multiplicação, Divisão e Porcentagem, Aplicar as funções básicas do excel, Formatar planilhas Excel a partir de condicionais, Criar gráficos",
    },
  ],
  security: [
    {
      id: 4,
      name: "Privacy and Data Protection Essentials",
      issuer: "ASSA ABLOY Group",
      date: "Agosto 2024",
      status: "Ativo",
      description: "Certificação em proteção de dados e privacidade, focando em aspectos essenciais de segurança.",
      skills: ["Proteção de dados", "Privacidade", "Segurança", "Habilidades analíticas"],
      credentialId: "AA-2024-PDP",
      category: "Segurança & Proteção de Dados",
    },
    {
      id: 5,
      name: "Code of Conduct (A-H)",
      issuer: "ASSA ABLOY Group",
      date: "Agosto 2024",
      status: "Ativo",
      description: "Certificação em código de conduta empresarial e ética profissional.",
      skills: ["Ética profissional", "Código de conduta", "Habilidades analíticas"],
      credentialId: "AA-2024-COC",
      category: "Segurança & Proteção de Dados",
    },
    {
      id: 6,
      name: "RSD - Targeted Attacks",
      issuer: "ASSA ABLOY Group",
      date: "Agosto 2024",
      status: "Ativo",
      description: "Certificação em reconhecimento e defesa contra ataques direcionados.",
      skills: ["Segurança cibernética", "Ataques direcionados", "Defesa", "Habilidades analíticas"],
      credentialId: "AA-2024-RTA",
      category: "Segurança & Proteção de Dados",
    },
    {
      id: 7,
      name: "Security Awareness Program - Staying Safe Online",
      issuer: "ASSA ABLOY Group",
      date: "Julho 2024",
      status: "Ativo",
      description: "Programa de conscientização em segurança digital e proteção online.",
      skills: ["Segurança digital", "Conscientização", "Proteção online", "Habilidades analíticas"],
      credentialId: "AA-2024-SAP",
      category: "Segurança & Proteção de Dados",
    },
    {
      id: 8,
      name: "RSD - Social Engineering",
      issuer: "ASSA ABLOY Group",
      date: "Julho 2024",
      status: "Ativo",
      description: "Certificação em reconhecimento e defesa contra engenharia social.",
      skills: ["Engenharia social", "Segurança", "Defesa", "Habilidades analíticas"],
      credentialId: "AA-2024-RSE",
      category: "Segurança & Proteção de Dados",
    },
    {
      id: 9,
      name: "Security Awareness - Social Engineering Attacks",
      issuer: "ASSA ABLOY Group",
      date: "Julho 2024",
      status: "Ativo",
      description: "Conscientização sobre ataques de engenharia social e métodos de prevenção.",
      skills: ["Ataques de engenharia social", "Prevenção", "Segurança", "Habilidades analíticas"],
      credentialId: "AA-2024-SEA",
      category: "Segurança & Proteção de Dados",
    },
    {
      id: 10,
      name: "Security Awareness Program - Key Defense",
      issuer: "ASSA ABLOY Group",
      date: "Julho 2024",
      status: "Ativo",
      description: "Programa de defesa e proteção de informações críticas.",
      skills: ["Defesa de chaves", "Proteção de informações", "Segurança", "Habilidades analíticas"],
      credentialId: "AA-2024-KD",
      category: "Segurança & Proteção de Dados",
    },
  ],
  it: [
    {
      id: 11,
      name: "Analista em Suporte Técnico",
      issuer: "MicroPRO",
      date: "Fevereiro 2024",
      status: "Ativo",
      description:
        "Certificação completa em suporte técnico, incluindo gestão de infraestrutura de TI e resolução de problemas.",
      skills: [
        "Suporte técnico",
        "TI",
        "Resolução de problemas",
        "Gestão de infraestrutura",
        "Programação",
        "Trabalho em equipe",
      ],
      credentialId: "MP-2024-AST",
      category: "Tecnologia da Informação",
      details:
        "Capacidade de organização, Operações computacionais, Treinamento ministrado por instrutor, Pensamento crítico, Resolução de problemas, Tecnologia da informação, Programação (computação), Solicitação de proposta, Gestão de infraestrutura de TI, Solução de problemas técnicos, Trabalho em equipe, Administração geral, Gestão estratégica de TI, Atuação em conhecimentos de informática, Aprovisionamento de TI, Análise de modo e efeito de falha, Equipamentos de escritório, Habilidades analíticas, Treinamento e desenvolvimento de funcionários, Suporte técnico",
    },
    {
      id: 12,
      name: "Treinamento Profissional em Informática",
      issuer: "Cedaspy - Unidade SLS",
      date: "Maio 2020",
      status: "Ativo",
      description:
        "Curso completo incluindo Plataforma Web, Produção de Documentos, Administração Financeira e Marketing Digital.",
      skills: ["Informática", "Microsoft Office", "Marketing Digital", "Administração Financeira", "Web"],
      credentialId: "CEDASPY-2020-TPI",
      category: "Tecnologia da Informação",
      details:
        "Plataforma Web I, Plataforma Web II, Produção de Documentos Profissionais, Administração Financeira, Marketing Digital I e Marketing Digital II",
    },
  ],
  business: [
    {
      id: 13,
      name: "Projeto de Case: Estudo de Casos na Matéria Polivalente",
      issuer: "Geração Futuro Aprendizagem",
      date: "Setembro 2024",
      status: "Ativo",
      description: "Certificação em metodologia de estudo de casos e análise de situações polivalentes.",
      skills: ["Análise de casos", "Metodologia", "Pensamento crítico", "Resolução de problemas"],
      credentialId: "GFA-2024-002",
      category: "Gestão & Negócios",
    },
    {
      id: 14,
      name: "Gestão de Pequenos Negócios",
      issuer: "Start",
      date: "Dezembro 2022",
      status: "Ativo",
      description:
        "Formação completa em gestão empresarial, incluindo SWOT, CANVAS, marketing digital e estratégias de preços.",
      skills: ["Gestão empresarial", "Empreendedorismo", "Marketing digital", "SWOT", "CANVAS", "Liderança"],
      credentialId: "START-2022-GPN",
      category: "Gestão & Negócios",
      details:
        "CHA (Conhecimentos, Habilidades e Atitudes), SWOT, SMART, Golden Circle, perfis comportamentais, múltiplas inteligências, inteligência emocional, empatia, currículo, LinkedIn, entrevistas, imagem profissional, networking, contabilidade básica, KPIs, BSC, gestão holística, incentivos e vieses cognitivos, gestão de stakeholders, CANVAS, economia colaborativa, marketing digital, e estratégias de preços",
    },
    {
      id: 15,
      name: "TCEPE - Treinamento de Capacitação Profissional Estudantil",
      issuer: "Cedaspy - Unidade SLS",
      date: "Agosto 2019",
      status: "Ativo",
      description: "Treinamento em capacitação profissional com foco em preparação para o mercado de trabalho.",
      skills: [
        "Capacitação profissional",
        "Preparação para emprego",
        "Legislação trabalhista",
        "Informática corporativa",
      ],
      credentialId: "CEDASPY-2019-TCEPE",
      category: "Gestão & Negócios",
      details:
        "Noções fundamentais sobre elaboração de currículo, preparo para entrevista de emprego, legislação de aprendizagem e estágios e uso de ferramentas de internet e informática corporativa",
    },
    {
      id: 16,
      name: "MAI - Módulo de Acesso Inicial",
      issuer: "Cedaspy - Unidade SLS",
      date: "Julho 2019",
      status: "Ativo",
      description: "Módulo introdutório com fundamentos em Microsoft Office e trabalho em equipe.",
      skills: ["Microsoft Office", "Empreendedorismo", "Trabalho em equipe"],
      credentialId: "CEDASPY-2019-MAI",
      category: "Gestão & Negócios",
    },
  ],
  creative: [
    {
      id: 17,
      name: "Maquiagem Artística",
      issuer: "Cedaspy - Unidade SLS",
      date: "Agosto 2020",
      status: "Ativo",
      description: "Curso de maquiagem artística com técnicas profissionais.",
      skills: ["Maquiagem", "Arte", "Técnicas artísticas", "Criatividade"],
      credentialId: "CEDASPY-2020-MA",
      category: "Cursos Complementares",
    },
    {
      id: 18,
      name: "Oficina de Fotografia",
      issuer: "Cedaspy - Unidade SLS",
      date: "Agosto 2020",
      status: "Ativo",
      description: "Oficina de fotografia com técnicas básicas e avançadas.",
      skills: ["Fotografia", "Técnicas visuais", "Composição", "Criatividade"],
      credentialId: "CEDASPY-2020-OF",
      category: "Cursos Complementares",
    },
    {
      id: 19,
      name: "Cartão Interativo",
      issuer: "Cedaspy - Unidade SLS",
      date: "Junho 2020",
      status: "Ativo",
      description: "Curso de criação de cartões interativos e design gráfico.",
      skills: ["Design gráfico", "Criatividade", "Interatividade", "Arte digital"],
      credentialId: "CEDASPY-2020-CI",
      category: "Cursos Complementares",
    },
  ],
}

// Certificações em andamento
const ongoingCertifications = [
  {
    id: 1,
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    expectedDate: "Março 2025",
    progress: 75,
    description: "Certificação fundamental em computação em nuvem AWS.",
    skills: ["AWS", "Cloud Computing", "Infraestrutura", "DevOps"],
  },
  {
    id: 2,
    name: "Google Analytics 4",
    issuer: "Google",
    expectedDate: "Abril 2025",
    progress: 50,
    description: "Certificação em análise de dados web e marketing digital.",
    skills: ["Google Analytics", "Marketing Digital", "Análise de Dados", "SEO"],
  },
]

const categoryIcons = {
  "Excel & Análise de Dados": Code,
  "Segurança & Proteção de Dados": Shield,
  "Tecnologia da Informação": Code,
  "Gestão & Negócios": Briefcase,
  "Cursos Complementares": Palette,
}

const categoryColors = {
  "Excel & Análise de Dados": "text-green-600",
  "Segurança & Proteção de Dados": "text-red-600",
  "Tecnologia da Informação": "text-blue-600",
  "Gestão & Negócios": "text-purple-600",
  "Cursos Complementares": "text-orange-600",
}

export function CertificationsSection() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
    rootMargin: "-100px 0px -50px 0px",
  })

  // Flatten all certifications for counting
  const allCertifications = Object.values(certificationsByCategory).flat()

  return (
    <section id="certifications" className="py-20 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Certificações & Qualificações"
          subtitle="Formação contínua e desenvolvimento profissional"
          centered
        />

        {/* Statistics */}
        <div className="mt-8 mb-12 text-center">
          <div className="inline-flex items-center gap-6 bg-background/80 backdrop-blur-sm rounded-lg px-6 py-3 border">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <span className="font-semibold">{allCertifications.length} Certificações</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="font-semibold">5 Categorias</span>
            </div>
          </div>
        </div>

        <div className="space-y-16">
          {/* Certificações por Categoria */}
          {Object.entries(certificationsByCategory).map(([categoryKey, certifications], categoryIndex) => {
            const category = certifications[0]?.category || categoryKey
            const IconComponent = categoryIcons[category] || Award
            const colorClass = categoryColors[category] || "text-primary"

            return (
              <div key={categoryKey}>
                <h3 className="text-2xl font-semibold mb-8 flex items-center">
                  <IconComponent className={`h-6 w-6 mr-3 ${colorClass}`} />
                  {category}
                  <Badge variant="outline" className="ml-3">
                    {certifications.length} certificação{certifications.length > 1 ? "ões" : ""}
                  </Badge>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{
                        duration: 0.6,
                        delay: inView ? categoryIndex * 0.2 + index * 0.1 : 0,
                      }}
                    >
                      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                                <IconComponent className={`h-5 w-5 ${colorClass}`} />
                              </div>
                              <div>
                                <Badge variant="outline" className="text-xs">
                                  {cert.status}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3 mr-1" />
                              {cert.date}
                            </div>
                          </div>

                          <h4 className="font-semibold text-lg mb-2 line-clamp-2">{cert.name}</h4>
                          <p className="text-sm text-muted-foreground mb-1">{cert.issuer}</p>
                          <p className="text-sm mb-4 line-clamp-3">{cert.description}</p>

                          {cert.details && (
                            <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                              <h5 className="text-xs font-medium mb-1 text-muted-foreground">Conteúdo detalhado:</h5>
                              <p className="text-xs line-clamp-3">{cert.details}</p>
                            </div>
                          )}

                          <div className="mb-4">
                            <h5 className="text-sm font-medium mb-2">Competências:</h5>
                            <div className="flex flex-wrap gap-1">
                              {cert.skills.slice(0, 4).map((skill, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                              {cert.skills.length > 4 && (
                                <Badge variant="outline" className="text-xs">
                                  +{cert.skills.length - 4} mais
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="text-xs text-muted-foreground">
                            <span>ID: {cert.credentialId}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          })}

          {/* Certificações em Andamento */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 flex items-center">
              <CheckCircle2 className="h-6 w-6 mr-3 text-orange-500" />
              Em Andamento
              <Badge variant="outline" className="ml-3">
                {ongoingCertifications.length} em andamento
              </Badge>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ongoingCertifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{
                    duration: 0.6,
                    delay: inView ? Object.keys(certificationsByCategory).length * 0.2 + index * 0.15 : 0,
                  }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-lg">{cert.name}</h4>
                          <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                        </div>
                        <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                          {cert.progress}% Concluído
                        </Badge>
                      </div>

                      <p className="text-sm mb-4">{cert.description}</p>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Progresso</span>
                          <span>Conclusão prevista: {cert.expectedDate}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${cert.progress}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <h5 className="text-sm font-medium mb-2">Competências a adquirir:</h5>
                        <div className="flex flex-wrap gap-1">
                          {cert.skills.map((skill, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
