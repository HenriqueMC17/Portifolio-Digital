"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MessageCircle,
  Send,
  X,
  Bot,
  User,
  Download,
  Sparkles,
  Coffee,
  Code,
  Briefcase,
  GraduationCap,
  Phone,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

const quickSuggestions = [
  { icon: User, text: "Quem é Henrique?", query: "Quem é Henrique Monteiro Cardoso?" },
  { icon: Code, text: "Habilidades técnicas", query: "Quais são suas habilidades técnicas?" },
  { icon: Briefcase, text: "Experiência profissional", query: "Conte sobre sua experiência profissional" },
  { icon: Sparkles, text: "Projetos desenvolvidos", query: "Quais projetos você desenvolveu?" },
  { icon: GraduationCap, text: "Formação acadêmica", query: "Qual é sua formação acadêmica?" },
  { icon: Coffee, text: "Especialidade em Java", query: "Conte sobre sua experiência com Java" },
  { icon: Phone, text: "Como entrar em contato", query: "Como posso entrar em contato?" },
  { icon: Download, text: "Baixar currículo", query: "Como baixar seu currículo?" },
]

export function AIHenriqueBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Olá! 👋 Sou o assistente virtual do Henrique. Posso responder qualquer pergunta sobre sua experiência profissional, habilidades técnicas, projetos e muito mais. Como posso ajudá-lo?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: content }),
      })

      if (!response.ok) {
        throw new Error("Erro na resposta do servidor")
      }

      const data = await response.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Desculpe, ocorreu um erro. Tente novamente em alguns instantes.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  const handleSuggestionClick = (query: string) => {
    sendMessage(query)
  }

  const downloadCV = () => {
    window.open(
      "https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy9kZWZjNmQ2ZGIwNzRiZjUyL0VZOEtVd2FoMXo5Qmxxcm9fRk1Jd1FFQm5sQnNwS1pIY0VqNWRZWDZ0QWZUYXc%5FZT00NjZyT1k&cid=DEFC6D6DB074BF52&id=DEFC6D6DB074BF52%21s06530a8fd7a1413f96aae8fc5308c101&parId=DEFC6D6DB074BF52%21sd11ecb22e073453eaa45bf1f2f3f921a&o=OneUp",
      "_blank",
    )
  }

  return (
    <>
      {/* Trigger Button */}
      <Button
        data-chatbot-trigger
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:scale-110"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Abrir chat</span>
      </Button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)]"
          >
            <Card className="h-full flex flex-col shadow-2xl border-2 bg-gradient-to-br from-background to-background/95 backdrop-blur-sm">
              {/* Header */}
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 bg-gradient-to-r from-primary/10 to-primary/5 border-b">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span>Henrique AI</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button onClick={downloadCV} size="sm" variant="outline" className="h-8 px-2 text-xs bg-transparent">
                    <Download className="h-3 w-3 mr-1" />
                    CV
                  </Button>
                  <Button onClick={() => setIsOpen(false)} size="icon" variant="ghost" className="h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-0 flex flex-col">
                <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-3 py-2 ${
                            message.sender === "user" ? "bg-primary text-primary-foreground ml-4" : "bg-muted mr-4"
                          }`}
                        >
                          <div className="flex items-start space-x-2">
                            {message.sender === "bot" && <Bot className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />}
                            <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="bg-muted rounded-lg px-3 py-2 mr-4">
                          <div className="flex items-center space-x-2">
                            <Bot className="h-4 w-4 text-primary" />
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                              <div
                                className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              />
                              <div
                                className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </ScrollArea>

                {/* Quick Suggestions */}
                {messages.length === 1 && (
                  <div className="p-4 border-t bg-muted/30">
                    <p className="text-xs text-muted-foreground mb-3">Sugestões rápidas:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {quickSuggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion.query)}
                          variant="outline"
                          size="sm"
                          className="h-auto p-2 text-xs justify-start"
                        >
                          <suggestion.icon className="h-3 w-3 mr-1 flex-shrink-0" />
                          <span className="truncate">{suggestion.text}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 border-t">
                  <form onSubmit={handleSubmit} className="flex space-x-2">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Digite sua pergunta..."
                      disabled={isTyping}
                      className="flex-1"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={!inputValue.trim() || isTyping}
                      className="bg-gradient-to-r from-primary to-primary/80"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
