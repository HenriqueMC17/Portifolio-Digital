"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([])
  const [input, setInput] = useState("")
  const { language } = useLanguage()

  const content = {
    pt: {
      title: "HenriqueBot",
      placeholder: "Pergunte sobre trajetória, projetos, tecnologias ou entrevista técnica...",
      welcome: "Olá! Sou o HenriqueBot. Posso responder sobre trajetória, projetos, tecnologias e experiência profissional.",
      fallback: "Ótima pergunta. Posso detalhar projetos, stack, experiência profissional e simular perguntas de entrevista técnica.",
    },
    en: {
      title: "HenriqueBot",
      placeholder: "Ask about journey, projects, technologies or technical interview...",
      welcome: "Hello! I am HenriqueBot. I can answer about journey, projects, technologies and professional experience.",
      fallback: "Great question. I can detail projects, stack, professional experience and simulate technical interview prompts.",
    },
  }

  const t = content[language]

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setInput("")

    let response = t.fallback
    if (/trajetoria|trajetória|journey/i.test(userMessage)) {
      response = language === "pt" ? "Minha trajetória é focada em desenvolvimento full stack, integrações e automações com foco em eficiência operacional." : "My journey is focused on full stack development, integrations and automations with operational efficiency focus."
    } else if (/projeto|project/i.test(userMessage)) {
      response = language === "pt" ? "O projeto Safe Finance é um dos destaques: arquitetura modular, UX clara e foco em controle financeiro com previsibilidade." : "Safe Finance is a highlighted project: modular architecture, clear UX and focus on predictable financial control."
    } else if (/tecnologia|stack|technology/i.test(userMessage)) {
      response = language === "pt" ? "Stack principal: Java, JavaScript, TypeScript, Python, C#, SQL, React e Next.js." : "Core stack: Java, JavaScript, TypeScript, Python, C#, SQL, React and Next.js."
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: response }])
    }, 400)
  }

  return (
    <>
      <Button
        size="lg"
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg z-50 animate-pulse-glow"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI Assistant"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] shadow-2xl z-50">
          <CardHeader className="border-b">
            <CardTitle className="text-lg gradient-text">{t.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-96 overflow-y-auto mb-4 space-y-4">
              <div className="bg-secondary/50 rounded-lg p-3">
                <p className="text-sm">{t.welcome}</p>
              </div>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`rounded-lg p-3 ${
                    msg.role === "user" ? "bg-primary text-primary-foreground ml-8" : "bg-secondary/50 mr-8"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder={t.placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <Button size="icon" onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
