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
          question: "Quais tecnologias você utiliza?",
          answer:
            "Trabalho principalmente com React, Next.js, Node.js, TypeScript, e tenho especialização em soluções de IA com OpenAI e LangChain.",
        },
        {
          question: "Quanto tempo leva um projeto?",
          answer:
            "O prazo varia conforme a complexidade do projeto. Projetos simples podem levar 2-4 semanas, enquanto projetos mais complexos podem levar 2-3 meses.",
        },
        {
          question: "Você trabalha remotamente?",
          answer:
            "Sim! Trabalho 100% remoto e tenho experiência com equipes distribuídas em diferentes fusos horários.",
        },
        {
          question: "Como funciona o processo de desenvolvimento?",
          answer:
            "Sigo metodologia ágil com sprints semanais, entregas incrementais e comunicação constante. Você terá visibilidade total do progresso.",
        },
      ],
    },
    en: {
      title: "Frequently Asked Questions",
      faqs: [
        {
          question: "What technologies do you use?",
          answer:
            "I mainly work with React, Next.js, Node.js, TypeScript, and I have specialization in AI solutions with OpenAI and LangChain.",
        },
        {
          question: "How long does a project take?",
          answer:
            "The timeline varies depending on project complexity. Simple projects can take 2-4 weeks, while more complex projects can take 2-3 months.",
        },
        {
          question: "Do you work remotely?",
          answer: "Yes! I work 100% remotely and have experience with distributed teams across different time zones.",
        },
        {
          question: "How does the development process work?",
          answer:
            "I follow agile methodology with weekly sprints, incremental deliveries and constant communication. You will have full visibility of progress.",
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
