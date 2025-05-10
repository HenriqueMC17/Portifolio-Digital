"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Star, GitFork, Code, Users } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface GitHubStats {
  totalStars: number
  totalForks: number
  totalRepos: number
  totalFollowers: number
  languages: { [key: string]: number }
  mostUsedLanguages: { name: string; percentage: number }[]
}

export function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats>({
    totalStars: 0,
    totalForks: 0,
    totalRepos: 28,
    totalFollowers: 0,
    languages: {},
    mostUsedLanguages: [
      { name: "Java", percentage: 75 },
      { name: "JavaScript", percentage: 15 },
      { name: "HTML", percentage: 5 },
      { name: "CSS", percentage: 5 },
    ],
  })

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Simulação de dados do GitHub
  // Em um ambiente real, você faria uma chamada à API do GitHub
  useEffect(() => {
    // Simulação de dados
    const mockData = {
      totalStars: 10,
      totalForks: 5,
      totalRepos: 28,
      totalFollowers: 15,
      languages: {
        Java: 75,
        JavaScript: 15,
        HTML: 5,
        CSS: 5,
      },
      mostUsedLanguages: [
        { name: "Java", percentage: 75 },
        { name: "JavaScript", percentage: 15 },
        { name: "HTML", percentage: 5 },
        { name: "CSS", percentage: 5 },
      ],
    }

    setStats(mockData)
  }, [])

  return (
    <section id="github-stats" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Estatísticas do GitHub</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Uma visão geral da minha atividade e contribuições no GitHub.
          </p>
          <div className="h-1 w-20 bg-primary mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <Card className="h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">{stats.totalRepos}</h3>
                <p className="text-muted-foreground">Repositórios</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-primary/10">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">{stats.totalStars}</h3>
                <p className="text-muted-foreground">Estrelas</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-primary/10">
                  <GitFork className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">{stats.totalForks}</h3>
                <p className="text-muted-foreground">Forks</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 p-3 rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">{stats.totalFollowers}</h3>
                <p className="text-muted-foreground">Seguidores</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6">Linguagens Mais Utilizadas</h3>
              <div className="space-y-4">
                {stats.mostUsedLanguages.map((lang, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{lang.name}</span>
                      <span className="text-muted-foreground">{lang.percentage}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${
                          lang.name === "Java"
                            ? "bg-blue-500"
                            : lang.name === "JavaScript"
                              ? "bg-yellow-500"
                              : lang.name === "HTML"
                                ? "bg-orange-500"
                                : "bg-purple-500"
                        }`}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${lang.percentage}%` } : {}}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="text-center mt-8">
          <a
            href="https://github.com/HenriqueMC17"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Github className="mr-2 h-4 w-4" />
            Ver Perfil no GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
