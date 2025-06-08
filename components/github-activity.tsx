"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Github, GitCommit, Activity, TrendingUp } from "lucide-react"
import { getGitHubRepos, calculateCommitStreak, formatDate, type GitHubRepo } from "@/lib/github"

export function GitHubActivity() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    async function fetchActivity() {
      try {
        const data = await getGitHubRepos()
        setRepos(data)
        setStreak(calculateCommitStreak(data))
      } catch (err) {
        console.error("GitHub activity error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchActivity()
  }, [])

  if (loading) {
    return (
      <Card className="glass">
        <CardContent className="p-6">
          <Skeleton className="h-4 w-32 mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded" />
                <div className="flex-1">
                  <Skeleton className="h-3 w-3/4 mb-1" />
                  <Skeleton className="h-2 w-1/2" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const recentRepos = repos
    .filter((repo) => {
      const lastUpdate = new Date(repo.updated_at)
      const oneMonthAgo = new Date()
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
      return lastUpdate > oneMonthAgo
    })
    .slice(0, 5)

  return (
    <Card className="glass">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            Atividade Recente
          </h3>
          <Badge variant="outline" className="text-xs">
            <TrendingUp className="h-3 w-3 mr-1" />
            {streak} dias streak
          </Badge>
        </div>

        <div className="space-y-4">
          {recentRepos.length > 0 ? (
            recentRepos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                  <GitCommit className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{repo.name}</p>
                  <p className="text-xs text-muted-foreground">Atualizado {formatDate(repo.updated_at)}</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {repo.language || "Mixed"}
                </Badge>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8">
              <Github className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Nenhuma atividade recente</p>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 pt-4 border-t border-border/40">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-primary">{repos.length}</div>
              <div className="text-xs text-muted-foreground">Total Repos</div>
            </div>
            <div>
              <div className="text-lg font-bold text-chart-1">{recentRepos.length}</div>
              <div className="text-xs text-muted-foreground">Ativos</div>
            </div>
            <div>
              <div className="text-lg font-bold text-chart-2">{streak}</div>
              <div className="text-xs text-muted-foreground">Dias Streak</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
