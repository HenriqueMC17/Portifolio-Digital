"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

export function FAQSection() {
  const { language } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const content = {
    pt: {
      title: "Perguntas Frequentes",
      faqs: [
        {
          question: "Quais tecnologias voce utiliza?",
          answer:
            "Trabalho com Java, JavaScript, TypeScript, Python, C#, React, Next.js, Node.js, Tailwind CSS, SQL, PostgreSQL, MySQL, VBA, Google Apps Script e Arduino.",
        },
        {
          question: "Quanto tempo leva um projeto?",
          answer:
            "O prazo varia conforme a complexidade. Projetos simples de automacao levam de 1-2 semanas, sites institucionais de 2-4 semanas, e sistemas mais complexos de 1-3 meses.",
        },
        {
          question: "Voce esta disponivel para projetos freelance?",
          answer:
            "Sim! Estou disponivel para projetos freelance, oportunidades CLT e PJ. Respondo em ate 24 horas pelo email ou LinkedIn.",
        },
        {
          question: "Como funciona o processo de desenvolvimento?",
          answer:
            "Sigo uma abordagem estruturada: descoberta e planejamento, design e prototipagem, desenvolvimento com testes, e deploy com suporte continuo.",
        },
        {
          question: "Voce faz automacoes com Excel e planilhas?",
          answer:
            "Sim! Tenho experiencia solida com VBA, Google Apps Script e Excel avancado para automacao de processos, relatorios e integracao de dados.",
        },
      ],
    },
    en: {
      title: "Frequently Asked Questions",
      faqs: [
        {
          question: "What technologies do you use?",
          answer:
            "I work with Java, JavaScript, TypeScript, Python, C#, React, Next.js, Node.js, Tailwind CSS, SQL, PostgreSQL, MySQL, VBA, Google Apps Script and Arduino.",
        },
        {
          question: "How long does a project take?",
          answer:
            "The timeline varies by complexity. Simple automation projects take 1-2 weeks, institutional sites 2-4 weeks, and more complex systems 1-3 months.",
        },
        {
          question: "Are you available for freelance projects?",
          answer:
            "Yes! I am available for freelance projects, full-time and contract opportunities. I respond within 24 hours via email or LinkedIn.",
        },
        {
          question: "How does the development process work?",
          answer:
            "I follow a structured approach: discovery and planning, design and prototyping, development with testing, and deployment with continuous support.",
        },
        {
          question: "Do you do Excel and spreadsheet automation?",
          answer:
            "Yes! I have solid experience with VBA, Google Apps Script and advanced Excel for process automation, reports and data integration.",
        },
      ],
    },
  }

  const t = content[language]

  return (
    <section id="faq" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center gradient-text mb-12">{t.title}</h2>

          <div className="space-y-4">
            {t.faqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left p-6 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold pr-8">{faq.question}</h3>
                    <ChevronDown
                      className={cn("h-5 w-5 transition-transform", openIndex === index && "transform rotate-180")}
                    />
                  </div>
                </button>
                {openIndex === index && (
                  <CardContent className="pt-0 pb-6">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
