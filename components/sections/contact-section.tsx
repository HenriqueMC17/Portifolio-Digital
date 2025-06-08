"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Globe } from "lucide-react"

export function ContactSection() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  return (
    <section id="contact" className="py-20 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Entre em Contato</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Vamos conversar sobre oportunidades de trabalho, projetos ou colaborações. Estou sempre aberto a novos
            desafios!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-6">Informações de Contato</h3>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-primary mr-3" />
                    <a href="mailto:henriquemon17@gmail.com" className="hover:text-primary transition-colors">
                      henriquemon17@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-primary mr-3" />
                    <a href="tel:+5515988027261" className="hover:text-primary transition-colors">
                      (15) 98802-7261
                    </a>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-primary mr-3" />
                    <span>Nova Sorocaba, São Paulo - Brasil</span>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-medium mb-4">Idiomas</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Português</span>
                      <span className="text-muted-foreground">Nativo</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Inglês</span>
                      <span className="text-muted-foreground">intermediário</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Espanhol</span>
                      <span className="text-muted-foreground">Básico</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-medium mb-4">Links Profissionais</h4>
                  <div className="space-y-3">
                    <a
                      href="https://github.com/HenriqueMC17"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm hover:text-primary transition-colors"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      GitHub - HenriqueMC17
                    </a>
                    <a
                      href="https://www.linkedin.com/in/henrique-monteiro-cardoso-ba3716229/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm hover:text-primary transition-colors"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      LinkedIn - Henrique Monteiro Cardoso
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-6">Envie uma Mensagem</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Seu nome" />
                    <Input type="email" placeholder="Seu email" />
                  </div>
                  <Input placeholder="Assunto" />
                  <Textarea placeholder="Sua mensagem" rows={5} />
                  <Button type="submit" className="w-full">
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
