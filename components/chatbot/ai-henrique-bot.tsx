"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  X,
  Send,
  Bot,
  User,
  Download,
  Briefcase,
  Code,
  GraduationCap,
  Mail,
  Lightbulb,
  Rocket,
  Coffee,
  Palette,
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface AIHenriqueBotProps {
  isOpen: boolean
  onClose: () => void
}

export function AIHenriqueBot({ isOpen, onClose }: AIHenriqueBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Olá! 👋 Sou o assistente virtual do Henrique Monteiro Cardoso. Posso responder sobre experiência profissional, habilidades técnicas, projetos e muito mais. Como posso ajudá-lo?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const quickQuestions = [
    { icon: Briefcase, text: "Experiência profissional", query: "Conte sobre sua experiência profissional" },
    { icon: Code, text: "Habilidades técnicas", query: "Quais são suas principais habilidades técnicas?" },
    { icon: Rocket, text: "Projetos desenvolvidos", query: "Quais projetos você já desenvolveu?" },
    { icon: GraduationCap, text: "Formação acadêmica", query: "Qual é sua formação acadêmica?" },
    { icon: Mail, text: "Informações de contato", query: "Como posso entrar em contato?" },
    { icon: Lightbulb, text: "Disponibilidade", query: "Está disponível para trabalho?" },
    { icon: Coffee, text: "Experiência com Java", query: "Qual sua experiência com Java e Spring?" },
    { icon: Palette, text: "Frontend e React", query: "Conte sobre sua experiência com React e frontend" },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageText }),
      })

      if (!response.ok) {
        throw new Error("Erro na resposta da API")
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Desculpe, ocorreu um erro. Tente novamente em alguns instantes.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputMessage)
  }

  const handleQuickQuestion = (query: string) => {
    sendMessage(query)
  }

  const handleDownloadCV = () => {
    window.open(
      "https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy9kZWZjNmQ2ZGIwNzRiZjUyL0VZOEtVd2FoMXo5Qmxxcm9fRk1Jd1FFQm5sQnNwS1pIY0VqNWRZWDZ0QWZUYXc%5FZT00NjZyT1k&cid=DEFC6D6DB074BF52&id=DEFC6D6DB074BF52%21s06530a8fd7a1413f96aae8fc5308c101&parId=DEFC6D6DB074BF52%21sd11ecb22e073453eaa45bf1f2f3f921a&o=OneUp",
      "_blank",
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl h-[80vh] max-h-[600px] bg-background rounded-2xl shadow-2xl border border-border/50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">HenriqueBot</h3>
                  <p className="text-sm text-muted-foreground">Assistente Virtual</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadCV}
                  className="hidden sm:flex items-center space-x-1 text-xs bg-transparent"
                >
                  <Download className="w-3 h-3" />
                  <span>CV</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="rounded-full hover:bg-red-500/10 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Quick Questions */}
            {messages.length <= 1 && (
              <div className="p-4 border-b border-border/50 bg-muted/30">
                <p className="text-sm text-muted-foreground mb-3">Perguntas rápidas:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleQuickQuestion(question.query)}
                      className="flex items-center space-x-2 p-2 text-xs bg-background hover:bg-muted rounded-lg border border-border/50 transition-colors text-left"
                    >
                      <question.icon className="w-3 h-3 text-blue-500 flex-shrink-0" />
                      <span className="truncate">{question.text}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${message.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-green-500 to-emerald-500"
                          : "bg-gradient-to-r from-blue-600 to-purple-600"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <Card
                      className={`p-3 ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20"
                          : "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {message.timestamp.toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </Card>
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <Card className="p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
                      <div className="flex space-x-1">
                        <div
                          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </Card>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border/50 bg-muted/30">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <Input
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Digite sua pergunta..."
                  disabled={isLoading}
                  className="flex-1 bg-background border-border/50 focus:border-blue-500/50"
                />
                <Button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
