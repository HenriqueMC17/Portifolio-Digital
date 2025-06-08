// Nome do cache
const CACHE_NAME = "hmc-portfolio-v1"

// Recursos para cache inicial
const INITIAL_CACHE_URLS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/birthday-song.mp3",
]

// Instalar o service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Cache aberto")
        return cache.addAll(INITIAL_CACHE_URLS)
      })
      .then(() => self.skipWaiting()),
  )
})

// Ativar o service worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("Removendo cache antigo:", cacheName)
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => self.clients.claim()),
  )
})

// Estratégia de cache: Network First com fallback para cache
self.addEventListener("fetch", (event) => {
  // Ignorar requisições para analytics
  if (event.request.url.includes("/api/analytics")) {
    return
  }

  // Ignorar requisições para o GitHub API
  if (event.request.url.includes("api.github.com")) {
    return
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clonar a resposta para armazenar no cache
        const responseToCache = response.clone()

        // Verificar se a resposta é válida
        if (response.status === 200) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })
        }

        return response
      })
      .catch(() => {
        // Fallback para cache se a rede falhar
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse
          }

          // Se não estiver no cache e for uma página, retornar a página inicial
          if (event.request.mode === "navigate") {
            return caches.match("/")
          }

          // Caso contrário, retornar um erro
          return new Response("Não foi possível carregar o recurso. Por favor, verifique sua conexão.", {
            status: 408,
            headers: { "Content-Type": "text/plain" },
          })
        })
      }),
  )
})

// Sincronizar dados quando a conexão for restabelecida
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-analytics") {
    event.waitUntil(syncAnalytics())
  }
})

// Função para sincronizar dados de analytics
async function syncAnalytics() {
  try {
    const analyticsData = localStorage.getItem("analytics_events")

    if (analyticsData) {
      const response = await fetch("/api/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: analyticsData,
      })

      if (response.ok) {
        localStorage.removeItem("analytics_events")
      }
    }
  } catch (error) {
    console.error("Erro ao sincronizar analytics:", error)
  }
}

// Lidar com notificações push
self.addEventListener("push", (event) => {
  const data = event.data.json()

  const options = {
    body: data.body,
    icon: "/icons/icon-192x192.png",
    badge: "/icons/badge-72x72.png",
    vibrate: [100, 50, 100],
    data: {
      url: data.url || "/",
    },
  }

  event.waitUntil(self.registration.showNotification(data.title, options))
})

// Abrir URL quando clicar na notificação
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  event.waitUntil(clients.openWindow(event.notification.data.url))
})
