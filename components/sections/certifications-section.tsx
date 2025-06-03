"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useLanguage } from "@/contexts/language-context"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Calendar, ExternalLink, CheckCircle2 } from "lucide-react"
import Image from "next/image"

// Dados de certificações
const certifications = [
  {
    id: 1,
    name: "Microsoft Office Specialist - Excel Expert",
    issuer: "Microsoft",
    date: "2024",
    status: "Ativo",
    description: "Certificação avançada em Excel, incluindo fórmulas complexas, macros, análise de dados e automação.",
    skills: ["Excel Avançado", "Macros VBA", "Análise de Dados", "Automação"],
    credentialId: "MOS-2024-001",
    verificationUrl: "#",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Gestão de Projetos - Metodologias Ágeis",
    issuer: "Fundação Bradesco",
    date: "2024",
    status: "Ativo",
    description: "Curso completo sobre metodologias ágeis, Scrum, Kanban e gestão de projetos de software.",
    skills: ["Scrum", "Kanban", "Gestão de Projetos", "Metodologias Ágeis"],
    credentialId: "FB-2024-AGI",
    verificationUrl: "#",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Atendimento ao Cliente e Vendas",
    issuer: "SENAC",
    date: "2023",
    status: "Ativo",
    description: "Formação em técnicas de atendimento, negociação, vendas consultivas e relacionamento com clientes.",
    skills: ["Atendimento ao Cliente", "Vendas", "Negociação", "Relacionamento"],
    credentialId: "SENAC-2023-ACV",
    verificationUrl: "#",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Segurança do Trabalho - NR 35",
    issuer: "ASSA ABLOY Group",
    date: "2024",
    status: "Ativo",
    description: "Certificação em segurança para trabalho em altura, conforme Norma Regulamentadora 35.",
    skills: ["Segurança do Trabalho", "NR 35", "Prevenção de Acidentes", "Compliance"],
    credentialId: "AA-2024-NR35",
    verificationUrl: "#",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Inglês Intermediário - B2",
    issuer: "CCBEU Sorocaba",
    date: "2023",
    status: "Ativo",
    description: "Certificação de proficiência em inglês nível intermediário, com foco em comunicação empresarial.",
    skills: ["Inglês", "Comunicação", "Business English", "Conversação"],
    credentialId: "CCBEU-2023-B2",
    verificationUrl: "#",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Informática Básica e Avançada",
    issuer: "Microlins",
    date: "2022",
    status: "Ativo",
    description:
      "Curso completo de informática, incluindo pacote Office, internet, sistemas operacionais e manutenção.",
    skills: ["Pacote Office", "Windows", "Internet", "Manutenção de PC"],
    credentialId: "ML-2022-IBA",
    verificationUrl: "#",
    logo: "/placeholder.svg?height=40&width=40",
  },
]

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

export function CertificationsSection() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
    rootMargin: "-100px 0px -50px 0px",
  })

  return (
    <section id="certifications" className="py-20 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Certificações & Qualificações"
          subtitle="Formação contínua e desenvolvimento profissional"
          centered
        />

        <div className="mt-12 space-y-12">
          {/* Certificações Ativas */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <Award className="h-6 w-6 mr-2 text-primary" />
              Certificações Ativas
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: inView ? index * 0.1 : 0 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-muted">
                            <Image
                              src={cert.logo || "/placeholder.svg"}
                              alt={cert.issuer}
                              fill
                              className="object-contain p-1"
                            />
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

                      <h4 className="font-semibold text-lg mb-2">{cert.name}</h4>
                      <p className="text-sm text-muted-foreground mb-1">{cert.issuer}</p>
                      <p className="text-sm mb-4">{cert.description}</p>

                      <div className="mb-4">
                        <h5 className="text-sm font-medium mb-2">Competências:</h5>
                        <div className="flex flex-wrap gap-1">
                          {cert.skills.map((skill, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>ID: {cert.credentialId}</span>
                        <button className="flex items-center hover:text-primary transition-colors">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Verificar
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certificações em Andamento */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <CheckCircle2 className="h-6 w-6 mr-2 text-orange-500" />
              Em Andamento
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ongoingCertifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.6, delay: inView ? certifications.length * 0.1 + index * 0.15 : 0 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300">
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
