"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Github, ExternalLink, Star, GitFork, Clock } from "lucide-react"
import { getFeaturedRepos, getLanguageConfig, formatDate, type GitHubRepo } from "@/lib/github"

export function GitHubProjects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRepos() {
      try {
        const data = await getFeaturedRepos()
        setRepos(data.slice(0, 6)) // Mostrar apenas os 6 principais
      } catch (err) {
        setError("Erro ao carregar repositórios")
        console.error("GitHub repos error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="glass">
            <CardContent className="p-6">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-full mb-4" />
              <div className="flex gap-2 mb-4">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error || repos.length === 0) {
    return (
      <Card className="glass border-destructive/20">
        <CardContent className="p-6 text-center">
          <Github className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{error || "Nenhum repositório encontrado"}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {repos.map((repo, index) => {
        const languageConfig = repo.language ? getLanguageConfig(repo.language) : null
        const isMainProject = ["Safe-Finance", "Leand-Peage-Safe-Finance"].includes(repo.name)

        return (
          <motion.div
            key={repo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`glass interactive-card h-full ${isMainProject ? "ring-2 ring-primary/20" : ""}`}>
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Github className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold text-sm truncate">{repo.name}</h3>
                  </div>
                  {isMainProject && (
                    <Badge variant="default" className="text-xs">
                      Destaque
                    </Badge>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[2.5rem]">
                  {repo.description || "Sem descrição disponível"}
                </p>

                {/* Language & Stats */}
                <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                  {languageConfig && (
                    <div className="flex items-center gap-1">
                      <span>{languageConfig.icon}</span>
                      <span>{repo.language}</span>
                    </div>
                  )}
                  {repo.stargazers_count > 0 && (
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                  )}
                  {repo.forks_count > 0 && (
                    <div className="flex items-center gap-1">
                      <GitFork className="h-3 w-3" />
                      <span>{repo.forks_count}</span>
                    </div>
                  )}
                </div>

                {/* Topics */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {repo.topics.slice(0, 3).map((topic: string) => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                    {repo.topics.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{repo.topics.length - 3}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Last Update */}
                <div className="flex items-center gap-1 mb-4 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Atualizado {formatDate(repo.updated_at)}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" asChild className="flex-1">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                      <Github className="h-3 w-3 mr-1" />
                      Código
                    </a>
                  </Button>
                  {repo.homepage && (
                    <Button size="sm" asChild className="flex-1">
                      <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
