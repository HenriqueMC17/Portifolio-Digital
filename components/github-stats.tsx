"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Github, Star, GitFork, Users, Calendar, Code, Activity, TrendingUp } from "lucide-react"
import { getContributionStats, getLanguageConfig } from "@/lib/github"

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

  useEffect(() => {
    async function fetchStats() {
      try {
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
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <Card className="glass">
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

  if (error || !stats) {
    return (
      <Card className="glass border-destructive/20">
        <CardContent className="p-6 text-center">
          <Github className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{error || "Dados indisponíveis"}</p>
        </CardContent>
      </Card>
    )
  }

  const statItems = [
    {
      icon: Code,
      label: "Repositórios",
      value: stats.totalRepos,
      color: "text-blue-500",
    },
    {
      icon: Star,
      label: "Stars",
      value: stats.totalStars,
      color: "text-yellow-500",
    },
    {
      icon: GitFork,
      label: "Forks",
      value: stats.totalForks,
      color: "text-green-500",
    },
    {
      icon: Users,
      label: "Seguidores",
      value: stats.followers,
      color: "text-purple-500",
    },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      {/* Main Stats Card */}
      <Card className="glass">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Github className="h-5 w-5 text-primary" />
              <span className="font-mono text-sm font-medium">GitHub Stats</span>
            </div>
            <Badge variant="outline" className="text-xs">
              <Activity className="h-3 w-3 mr-1" />
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
              >
                <div className="flex items-center justify-center mb-2">
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <div className="text-2xl font-bold">{item.value}</div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border/40">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{stats.accountAge} anos no GitHub</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span>{stats.activeRepos} repos ativos</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Languages */}
      <Card className="glass">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Code className="h-4 w-4" />
            Linguagens Principais
          </h3>
          <div className="flex flex-wrap gap-2">
            {stats.topLanguages.map((language, index) => {
              const config = getLanguageConfig(language)
              return (
                <motion.div
                  key={language}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Badge variant="secondary" className="text-xs font-mono">
                    <span className="mr-1">{config.icon}</span>
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
