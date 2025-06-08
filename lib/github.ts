interface GitHubUser {
  login: string
  name: string
  bio: string
  public_repos: number
  followers: number
  following: number
  created_at: string
  updated_at: string
  avatar_url: string
  html_url: string
  location: string
  company: string
  blog: string
}

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  homepage: string
  language: string
  languages_url: string
  stargazers_count: number
  forks_count: number
  created_at: string
  updated_at: string
  pushed_at: string
  topics: string[]
  size: number
  default_branch: string
}

interface GitHubCommit {
  sha: string
  commit: {
    author: {
      name: string
      email: string
      date: string
    }
    message: string
  }
  html_url: string
}

interface GitHubLanguages {
  [key: string]: number
}

const GITHUB_USERNAME = "HenriqueMC17"
const GITHUB_API_BASE = "https://api.github.com"

// Cache para evitar muitas requisições
const cache = new Map()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutos

async function fetchWithCache(url: string, cacheKey: string) {
  const cached = cache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Portfolio-Website",
      },
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data = await response.json()
    cache.set(cacheKey, { data, timestamp: Date.now() })
    return data
  } catch (error) {
    console.error("GitHub API fetch error:", error)
    return null
  }
}

export async function getGitHubUser(): Promise<GitHubUser | null> {
  return fetchWithCache(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`, "user")
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  const repos = await fetchWithCache(
    `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
    "repos",
  )
  return repos || []
}

export async function getFeaturedRepos(): Promise<GitHubRepo[]> {
  const repos = await getGitHubRepos()

  // Repositórios específicos que queremos destacar
  const featuredRepoNames = ["Safe-Finance", "Leand-Peage-Safe-Finance"]

  const featured = repos.filter(
    (repo) => featuredRepoNames.includes(repo.name) || repo.stargazers_count > 0 || repo.description?.length > 10,
  )

  return featured.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
}

export async function getRepoLanguages(repoName: string): Promise<GitHubLanguages> {
  return (
    fetchWithCache(`${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}/languages`, `languages-${repoName}`) || {}
  )
}

export async function getRecentCommits(repoName: string, limit = 5): Promise<GitHubCommit[]> {
  const commits = await fetchWithCache(
    `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}/commits?per_page=${limit}`,
    `commits-${repoName}`,
  )
  return commits || []
}

export async function getAllLanguages(): Promise<{ [key: string]: number }> {
  const repos = await getGitHubRepos()
  const languageStats: { [key: string]: number } = {}

  for (const repo of repos) {
    if (repo.language) {
      languageStats[repo.language] = (languageStats[repo.language] || 0) + repo.size
    }
  }

  return languageStats
}

export async function getContributionStats() {
  const user = await getGitHubUser()
  const repos = await getGitHubRepos()

  if (!user || !repos) return null

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0)
  const languages = await getAllLanguages()
  const topLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([lang]) => lang)

  // Calcular commits aproximados baseado na atividade dos repos
  const recentRepos = repos.filter((repo) => {
    const lastUpdate = new Date(repo.updated_at)
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
    return lastUpdate > sixMonthsAgo
  })

  return {
    totalRepos: user.public_repos,
    totalStars,
    totalForks,
    followers: user.followers,
    following: user.following,
    topLanguages,
    activeRepos: recentRepos.length,
    accountAge: Math.floor((Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365)),
    lastActivity: repos.length > 0 ? repos[0].updated_at : user.updated_at,
  }
}

export async function getProjectDetails(repoName: string) {
  const repo = await fetchWithCache(`${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}`, `repo-${repoName}`)

  if (!repo) return null

  const languages = await getRepoLanguages(repoName)
  const commits = await getRecentCommits(repoName, 10)

  return {
    ...repo,
    languages,
    recentCommits: commits,
    lastCommitDate: commits[0]?.commit.author.date,
    commitCount: commits.length,
  }
}

// Função para mapear linguagens do GitHub para ícones/cores
export function getLanguageConfig(language: string) {
  const configs: { [key: string]: { color: string; icon: string } } = {
    JavaScript: { color: "#f7df1e", icon: "🟨" },
    TypeScript: { color: "#3178c6", icon: "🔷" },
    Java: { color: "#ed8b00", icon: "☕" },
    Python: { color: "#3776ab", icon: "🐍" },
    "C#": { color: "#239120", icon: "🔷" },
    "C++": { color: "#00599c", icon: "⚡" },
    HTML: { color: "#e34f26", icon: "🌐" },
    CSS: { color: "#1572b6", icon: "🎨" },
    SQL: { color: "#336791", icon: "🗄️" },
    Shell: { color: "#89e051", icon: "💻" },
    Dockerfile: { color: "#2496ed", icon: "🐳" },
    "Jupyter Notebook": { color: "#da5b0b", icon: "📓" },
  }

  return configs[language] || { color: "#6b7280", icon: "📄" }
}

// Função para formatar datas
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return "há 1 dia"
  if (diffDays < 7) return `há ${diffDays} dias`
  if (diffDays < 30) return `há ${Math.ceil(diffDays / 7)} semanas`
  if (diffDays < 365) return `há ${Math.ceil(diffDays / 30)} meses`
  return `há ${Math.ceil(diffDays / 365)} anos`
}

// Função para calcular streak de commits (simulada)
export function calculateCommitStreak(repos: GitHubRepo[]): number {
  // Simulação baseada na atividade recente dos repositórios
  const recentActivity = repos.filter((repo) => {
    const lastUpdate = new Date(repo.updated_at)
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    return lastUpdate > oneWeekAgo
  })

  return Math.min(recentActivity.length * 3, 30) // Máximo de 30 dias
}
