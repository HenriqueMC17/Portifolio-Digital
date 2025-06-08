"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Calendar, CheckCircle2, Shield, Code, Briefcase, Palette, ExternalLink } from "lucide-react"

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
      highlights: [
        "Desenvolvimento de dashboards interativos",
        "Análise avançada de dados",
        "Automação de processos",
        "Criação de relatórios gerenciais",
      ],
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
      highlights: [
        "Domínio de fórmulas avançadas",
        "Criação de gráficos profissionais",
        "Formatação condicional",
        "Tabelas dinâmicas",
      ],
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
      highlights: [
        "Fundamentos sólidos em Excel",
        "Operações matemáticas básicas",
        "Formatação de dados",
        "Criação de gráficos simples",
      ],
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
      skills: ["Proteção de dados", "Privacidade", "Segurança", "LGPD", "GDPR"],
      credentialId: "AA-2024-PDP",
      category: "Segurança & Proteção de Dados",
      highlights: [
        "Conformidade com LGPD",
        "Proteção de dados pessoais",
        "Políticas de privacidade",
        "Gestão de riscos",
      ],
    },
    {
      id: 5,
      name: "Code of Conduct (A-H)",
      issuer: "ASSA ABLOY Group",
      date: "Agosto 2024",
      status: "Ativo",
      description: "Certificação em código de conduta empresarial e ética profissional.",
      skills: ["Ética profissional", "Código de conduta", "Compliance", "Integridade"],
      credentialId: "AA-2024-COC",
      category: "Segurança & Proteção de Dados",
      highlights: ["Ética empresarial", "Conduta profissional", "Compliance corporativo", "Integridade organizacional"],
    },
    {
      id: 6,
      name: "RSD - Targeted Attacks",
      issuer: "ASSA ABLOY Group",
      date: "Agosto 2024",
      status: "Ativo",
      description: "Certificação em reconhecimento e defesa contra ataques direcionados.",
      skills: ["Segurança cibernética", "Ataques direcionados", "Defesa", "Prevenção"],
      credentialId: "AA-2024-RTA",
      category: "Segurança & Proteção de Dados",
      highlights: [
        "Identificação de ameaças",
        "Técnicas de defesa",
        "Análise de vulnerabilidades",
        "Resposta a incidentes",
      ],
    },
    {
      id: 7,
      name: "Security Awareness Program - Staying Safe Online",
      issuer: "ASSA ABLOY Group",
      date: "Julho 2024",
      status: "Ativo",
      description: "Programa de conscientização em segurança digital e proteção online.",
      skills: ["Segurança digital", "Conscientização", "Proteção online", "Boas práticas"],
      credentialId: "AA-2024-SAP",
      category: "Segurança & Proteção de Dados",
      highlights: [
        "Navegação segura",
        "Proteção de credenciais",
        "Reconhecimento de phishing",
        "Segurança em redes sociais",
      ],
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
        "Infraestrutura de TI",
        "Resolução de problemas",
        "Gestão de sistemas",
        "Help Desk",
        "Troubleshooting",
      ],
      credentialId: "MP-2024-AST",
      category: "Tecnologia da Informação",
      details:
        "Capacidade de organização, Operações computacionais, Treinamento ministrado por instrutor, Pensamento crítico, Resolução de problemas, Tecnologia da informação, Programação (computação), Solicitação de proposta, Gestão de infraestrutura de TI, Solução de problemas técnicos, Trabalho em equipe, Administração geral, Gestão estratégica de TI, Atuação em conhecimentos de informática, Aprovisionamento de TI, Análise de modo e efeito de falha, Equipamentos de escritório, Habilidades analíticas, Treinamento e desenvolvimento de funcionários, Suporte técnico",
      highlights: [
        "Gestão completa de infraestrutura",
        "Suporte técnico especializado",
        "Resolução de problemas complexos",
        "Treinamento de equipes",
      ],
    },
    {
      id: 12,
      name: "Treinamento Profissional em Informática",
      issuer: "Cedaspy - Unidade SLS",
      date: "Maio 2020",
      status: "Ativo",
      description:
        "Curso completo incluindo Plataforma Web, Produção de Documentos, Administração Financeira e Marketing Digital.",
      skills: [
        "Informática",
        "Microsoft Office",
        "Marketing Digital",
        "Administração Financeira",
        "Desenvolvimento Web",
      ],
      credentialId: "CEDASPY-2020-TPI",
      category: "Tecnologia da Informação",
      details:
        "Plataforma Web I, Plataforma Web II, Produção de Documentos Profissionais, Administração Financeira, Marketing Digital I e Marketing Digital II",
      highlights: [
        "Desenvolvimento web básico",
        "Produção de documentos profissionais",
        "Gestão financeira",
        "Estratégias de marketing digital",
      ],
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
      skills: [
        "Análise de casos",
        "Metodologia",
        "Pensamento crítico",
        "Resolução de problemas",
        "Análise estratégica",
      ],
      credentialId: "GFA-2024-002",
      category: "Gestão & Negócios",
      highlights: [
        "Metodologia de análise",
        "Pensamento estratégico",
        "Resolução de problemas complexos",
        "Tomada de decisão",
      ],
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
      highlights: [
        "Análise SWOT e CANVAS",
        "Estratégias de marketing",
        "Gestão financeira básica",
        "Desenvolvimento de liderança",
      ],
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
      skills: ["Maquiagem", "Arte", "Técnicas artísticas", "Criatividade", "Design"],
      credentialId: "CEDASPY-2020-MA",
      category: "Cursos Complementares",
      highlights: [
        "Técnicas artísticas avançadas",
        "Criatividade e inovação",
        "Atenção aos detalhes",
        "Expressão artística",
      ],
    },
    {
      id: 18,
      name: "Oficina de Fotografia",
      issuer: "Cedaspy - Unidade SLS",
      date: "Agosto 2020",
      status: "Ativo",
      description: "Oficina de fotografia com técnicas básicas e avançadas.",
      skills: ["Fotografia", "Técnicas visuais", "Composição", "Criatividade", "Edição"],
      credentialId: "CEDASPY-2020-OF",
      category: "Cursos Complementares",
      highlights: ["Composição fotográfica", "Técnicas de iluminação", "Edição básica", "Olhar artístico"],
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
    highlights: [
      "Fundamentos de cloud computing",
      "Serviços principais da AWS",
      "Modelos de preços",
      "Segurança na nuvem",
    ],
  },
  {
    id: 2,
    name: "Google Analytics 4",
    issuer: "Google",
    expectedDate: "Abril 2025",
    progress: 50,
    description: "Certificação em análise de dados web e marketing digital.",
    skills: ["Google Analytics", "Marketing Digital", "Análise de Dados", "SEO"],
    highlights: ["Configuração do GA4", "Análise de comportamento", "Relatórios personalizados", "Conversões e metas"],
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
                      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group">
                        <CardContent className="p-6">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                                <IconComponent className={`h-6 w-6 ${colorClass}`} />
                              </div>
                              <div>
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-green-50 text-green-700 border-green-200"
                                >
                                  {cert.status}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3 mr-1" />
                              {cert.date}
                            </div>
                          </div>

                          {/* Title and Issuer */}
                          <h4 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {cert.name}
                          </h4>
                          <p className="text-sm text-primary font-medium mb-3">{cert.issuer}</p>

                          {/* Description */}
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{cert.description}</p>

                          {/* Highlights */}
                          {cert.highlights && (
                            <div className="mb-4">
                              <h5 className="text-xs font-medium mb-2 text-muted-foreground uppercase tracking-wider">
                                Principais conquistas:
                              </h5>
                              <ul className="text-xs space-y-1">
                                {cert.highlights.slice(0, 3).map((highlight, i) => (
                                  <li key={i} className="flex items-start">
                                    <CheckCircle2 className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-muted-foreground">{highlight}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Detailed Content */}
                          {cert.details && (
                            <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                              <h5 className="text-xs font-medium mb-2 text-muted-foreground uppercase tracking-wider">
                                Conteúdo detalhado:
                              </h5>
                              <p className="text-xs text-muted-foreground line-clamp-4">{cert.details}</p>
                            </div>
                          )}

                          {/* Skills */}
                          <div className="mb-4">
                            <h5 className="text-xs font-medium mb-2 text-muted-foreground uppercase tracking-wider">
                              Competências desenvolvidas:
                            </h5>
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

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-3 border-t border-border/40">
                            <div className="text-xs text-muted-foreground font-mono">ID: {cert.credentialId}</div>
                            <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
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
              <Badge variant="outline" className="ml-3 bg-orange-50 text-orange-700 border-orange-200">
                {ongoingCertifications.length} em progresso
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
                  <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {cert.name}
                          </h4>
                          <p className="text-sm text-primary font-medium">{cert.issuer}</p>
                        </div>
                        <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                          {cert.progress}% Concluído
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">{cert.description}</p>

                      {/* Highlights */}
                      {cert.highlights && (
                        <div className="mb-4">
                          <h5 className="text-xs font-medium mb-2 text-muted-foreground uppercase tracking-wider">
                            O que você aprenderá:
                          </h5>
                          <ul className="text-xs space-y-1">
                            {cert.highlights.slice(0, 3).map((highlight, i) => (
                              <li key={i} className="flex items-start">
                                <CheckCircle2 className="h-3 w-3 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-muted-foreground mb-2">
                          <span>Progresso do curso</span>
                          <span>Conclusão prevista: {cert.expectedDate}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <motion.div
                            className="bg-orange-500 h-2 rounded-full transition-all duration-1000"
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${cert.progress}%` } : { width: 0 }}
                            transition={{ delay: 0.5, duration: 1 }}
                          />
                        </div>
                      </div>

                      {/* Skills */}
                      <div>
                        <h5 className="text-xs font-medium mb-2 text-muted-foreground uppercase tracking-wider">
                          Competências a adquirir:
                        </h5>
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
