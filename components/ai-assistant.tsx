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
      title: "Assistente Virtual",
      placeholder: "Digite sua mensagem...",
      welcome: "Olá! Como posso ajudar você hoje?",
    },
    en: {
      title: "Virtual Assistant",
      placeholder: "Type your message...",
      welcome: "Hello! How can I help you today?",
    },
  }

  const t = content[language]

  const handleSend = () => {
    if (!input.trim()) return

    setMessages([...messages, { role: "user", content: input }])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Obrigado pela mensagem! Este é um assistente de demonstração. Em breve responderei suas dúvidas.",
        },
      ])
    }, 1000)
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
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
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
