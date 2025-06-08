"use client"

import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Github, Star, GitFork, Users, Calendar, Code, Activity, TrendingUp, AlertCircle } from "lucide-react"
import { getContributionStats, getLanguageConfig } from "@/lib/github"
import { Button } from "@/components/ui/button"

interface GitHubStatsData {
  totalRepos: number
  totalStars: number
  totalForks: number
  followers: number
  following: number
  topLanguages: string[]
  activeRepos: number
  accountAge: number
  lastActivity: string
}

export function GitHubStats() {
  const [stats, setStats] = useState<GitHubStatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await getContributionStats()
      if (data) {
        setStats(data)
      } else {
        setError("Não foi possível carregar os dados do GitHub")
      }
    } catch (err) {
      setError("Erro ao conectar com o GitHub")
      console.error("GitHub stats error:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  if (loading) {
    return (
      <Card className="glass" role="status" aria-label="Carregando estatísticas do GitHub">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center">
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
                <Skeleton className="h-3 w-20 mx-auto" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="glass border-destructive/20">
        <CardContent className="p-6 text-center">
          <AlertCircle className="h-8 w-8 mx-auto mb-2 text-destructive" />
          <p className="text-sm text-muted-foreground mb-3">{error}</p>
          <Button variant="outline" size="sm" onClick={fetchStats} className="text-xs">
            Tentar novamente
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!stats) return null

  const statItems = [
    {
      icon: Code,
      label: "Repositórios",
      value: stats.totalRepos,
      color: "text-blue-500",
      ariaLabel: `${stats.totalRepos} repositórios públicos`,
    },
    {
      icon: Star,
      label: "Stars",
      value: stats.totalStars,
      color: "text-yellow-500",
      ariaLabel: `${stats.totalStars} estrelas recebidas`,
    },
    {
      icon: GitFork,
      label: "Forks",
      value: stats.totalForks,
      color: "text-green-500",
      ariaLabel: `${stats.totalForks} forks dos repositórios`,
    },
    {
      icon: Users,
      label: "Seguidores",
      value: stats.followers,
      color: "text-purple-500",
      ariaLabel: `${stats.followers} seguidores no GitHub`,
    },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {/* Main Stats Card */}
      <Card className="glass">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Github className="h-5 w-5 text-primary" aria-hidden="true" />
              <span className="font-mono text-sm font-medium">GitHub Stats</span>
            </div>
            <Badge variant="outline" className="text-xs">
              <Activity className="h-3 w-3 mr-1" aria-hidden="true" />
              Live
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {statItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
                role="group"
                aria-label={item.ariaLabel}
              >
                <div className="flex items-center justify-center mb-2">
                  <item.icon className={`h-5 w-5 ${item.color}`} aria-hidden="true" />
                </div>
                <div className="text-2xl font-bold" aria-label={`${item.value} ${item.label.toLowerCase()}`}>
                  {item.value}
                </div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border/40">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <span>{stats.accountAge} anos no GitHub</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" aria-hidden="true" />
              <span>{stats.activeRepos} repos ativos</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Languages */}
      <Card className="glass">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Code className="h-4 w-4" aria-hidden="true" />
            Linguagens Principais
          </h3>
          <div className="flex flex-wrap gap-2" role="list" aria-label="Principais linguagens de programação">
            {stats.topLanguages.map((language, index) => {
              const config = getLanguageConfig(language)
              return (
                <motion.div
                  key={language}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  role="listitem"
                >
                  <Badge variant="secondary" className="text-xs font-mono" aria-label={`Linguagem: ${language}`}>
                    <span className="mr-1" aria-hidden="true">
                      {config.icon}
                    </span>
                    {language}
                  </Badge>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
