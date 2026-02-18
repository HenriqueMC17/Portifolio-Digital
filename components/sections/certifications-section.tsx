"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function CertificationsSection() {
  const { language } = useLanguage()

  const content = {
    pt: {
      title: "Certificações & Qualificações",
      items: [
        {
          name: "Excel Profissionalizante e Especialista em Planilhas Eletrônicas",
          institution: "Instituição de Formação Técnica",
          year: "2024",
          area: "Automação e Produtividade",
          link: "#",
        },
        {
          name: "Analista em Suporte Técnico",
          institution: "Instituição de Formação Técnica",
          year: "2024",
          area: "Tecnologia da Informação",
          link: "#",
        },
        {
          name: "Privacy and Data Protection Essentials",
          institution: "Programa de Qualificação",
          year: "2024",
          area: "Segurança & Proteção de Dados",
          link: "#",
        },
        {
          name: "Gestão de Pequenos Negócios",
          institution: "Programa de Qualificação",
          year: "2022",
          area: "Gestão & Negócios",
          link: "#",
        },
      ],
    },
    en: {
      title: "Certifications & Qualifications",
      items: [
        {
          name: "Professional Excel and Electronic Spreadsheet Specialist",
          institution: "Technical Training Institution",
          year: "2024",
          area: "Automation and Productivity",
          link: "#",
        },
        {
          name: "Technical Support Analyst",
          institution: "Technical Training Institution",
          year: "2024",
          area: "Information Technology",
          link: "#",
        },
        {
          name: "Privacy and Data Protection Essentials",
          institution: "Qualification Program",
          year: "2024",
          area: "Security & Data Protection",
          link: "#",
        },
        {
          name: "Small Business Management",
          institution: "Qualification Program",
          year: "2022",
          area: "Management & Business",
          link: "#",
        },
      ],
    },
  }

  const t = content[language]

  return (
    <section id="certifications" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center gradient-text mb-12">{t.title}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {t.items.map((item) => (
              <Card key={item.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p><strong>{language === "pt" ? "Instituição" : "Institution"}:</strong> {item.institution}</p>
                  <p><strong>{language === "pt" ? "Ano" : "Year"}:</strong> {item.year}</p>
                  <div className="flex items-center gap-2">
                    <strong>{language === "pt" ? "Área" : "Area"}:</strong>
                    <Badge variant="secondary">{item.area}</Badge>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {language === "pt" ? "Link verificável" : "Verifiable link"}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
