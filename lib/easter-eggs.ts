"use client"

import { useEffect } from "react"

// Tipos de Easter Eggs
export type EasterEggType = "konami" | "dev" | "matrix" | "disco" | "gravity" | "thanos" | "rainbow" | "birthday"

// Interface para Easter Eggs
export interface EasterEgg {
  id: EasterEggType
  name: string
  description: string
  trigger: string
  isActive: boolean
  isUnlocked: boolean
  activate: () => void | (() => void)
  deactivate: () => void
}

// Sequências de teclas
const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
]

// Função para criar confetti sem dependência externa
export function launchConfetti(options: { particleCount?: number; spread?: number; origin?: { y: number } } = {}) {
  const { particleCount = 100, spread = 70, origin = { y: 0.6 } } = options

  // Criar elementos de confetti usando CSS animations
  const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]

  for (let i = 0; i < particleCount; i++) {
    const confetti = document.createElement("div")
    confetti.style.position = "fixed"
    confetti.style.left = "50%"
    confetti.style.top = `${origin.y * 100}%`
    confetti.style.width = "8px"
    confetti.style.height = "8px"
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    confetti.style.pointerEvents = "none"
    confetti.style.zIndex = "9999"
    confetti.style.borderRadius = "50%"
    confetti.style.transform = "translate(-50%, -50%)"

    document.body.appendChild(confetti)

    const angle = (Math.random() - 0.5) * spread * (Math.PI / 180)
    const velocity = Math.random() * 500 + 200
    const gravity = 980
    const startTime = Date.now()

    function animate() {
      const elapsed = (Date.now() - startTime) / 1000
      const x = Math.sin(angle) * velocity * elapsed
      const y = Math.cos(angle) * velocity * elapsed + 0.5 * gravity * elapsed * elapsed

      confetti.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${elapsed * 360}deg)`
      confetti.style.opacity = `${Math.max(0, 1 - elapsed / 3)}`

      if (elapsed < 3 && document.body.contains(confetti)) {
        requestAnimationFrame(animate)
      } else {
        if (document.body.contains(confetti)) {
          document.body.removeChild(confetti)
        }
      }
    }

    requestAnimationFrame(animate)
  }
}

// Função para criar confetti em formato de emoji
export function launchEmojiConfetti(emoji: string) {
  const particleCount = 30
  const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]

  for (let i = 0; i < particleCount; i++) {
    const confetti = document.createElement("div")
    confetti.style.position = "fixed"
    confetti.style.left = "50%"
    confetti.style.top = "60%"
    confetti.style.fontSize = "24px"
    confetti.style.pointerEvents = "none"
    confetti.style.zIndex = "9999"
    confetti.textContent = emoji

    const angle = (Math.random() - 0.5) * 70 * (Math.PI / 180)
    const velocity = Math.random() * 400 + 150
    const gravity = 980

    confetti.style.transform = `translate(-50%, -50%)`
    document.body.appendChild(confetti)

    const startTime = Date.now()

    function animate() {
      const elapsed = (Date.now() - startTime) / 1000
      const x = Math.sin(angle) * velocity * elapsed
      const y = Math.cos(angle) * velocity * elapsed + 0.5 * gravity * elapsed * elapsed

      confetti.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${elapsed * 180}deg)`
      confetti.style.opacity = `${Math.max(0, 1 - elapsed / 3)}`

      if (elapsed < 3) {
        requestAnimationFrame(animate)
      } else {
        if (document.body.contains(confetti)) {
          document.body.removeChild(confetti)
        }
      }
    }

    requestAnimationFrame(animate)
  }
}

// Função para aplicar efeito Matrix
export function applyMatrixEffect(): () => void {
  const canvas = document.createElement("canvas")
  canvas.id = "matrix-canvas"
  canvas.style.position = "fixed"
  canvas.style.top = "0"
  canvas.style.left = "0"
  canvas.style.width = "100vw"
  canvas.style.height = "100vh"
  canvas.style.zIndex = "9998"
  canvas.style.pointerEvents = "none"
  canvas.style.opacity = "0.8"
  canvas.setAttribute("aria-hidden", "true")

  // Função para redimensionar canvas
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  resizeCanvas()
  document.body.appendChild(canvas)

  const ctx = canvas.getContext("2d")
  if (!ctx) return () => {}

  const characters =
    "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const fontSize = Math.max(10, Math.min(16, window.innerWidth / 100))
  const columns = Math.floor(canvas.width / fontSize)
  const drops: number[] = Array(columns).fill(1)

  function draw() {
    if (!ctx) return
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "#0F0"
    ctx.font = `${fontSize}px monospace`

    for (let i = 0; i < drops.length; i++) {
      const text = characters.charAt(Math.floor(Math.random() * characters.length))
      ctx.fillText(text, i * fontSize, drops[i] * fontSize)

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }
      drops[i]++
    }
  }

  const matrixInterval = setInterval(draw, 33)

  // Listener para redimensionamento
  window.addEventListener("resize", resizeCanvas)

  return () => {
    clearInterval(matrixInterval)
    window.removeEventListener("resize", resizeCanvas)
    const element = document.getElementById("matrix-canvas")
    if (element && document.body.contains(element)) {
      document.body.removeChild(element)
    }
  }
}

// Função para aplicar efeito Disco
export function applyDiscoEffect(): () => void {
  const colors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#8B00FF"]
  const elements = document.querySelectorAll("*")
  const originalStyles = new Map()

  elements.forEach((el) => {
    const computedStyle = window.getComputedStyle(el)
    originalStyles.set(el, {
      backgroundColor: computedStyle.backgroundColor,
      color: computedStyle.color,
      transition: computedStyle.transition,
    })
    ;(el as HTMLElement).style.transition = "background-color 0.5s, color 0.5s"
  })

  let colorIndex = 0

  const discoInterval = setInterval(() => {
    elements.forEach((el, i) => {
      if (Math.random() > 0.7) {
        const color = colors[(colorIndex + i) % colors.length]
        ;(el as HTMLElement).style.backgroundColor = `${color}${Math.floor(Math.random() * 30 + 10).toString(16)}`
        ;(el as HTMLElement).style.color = colors[(colorIndex + i + 3) % colors.length]
      }
    })

    colorIndex = (colorIndex + 1) % colors.length
  }, 500)

  return () => {
    clearInterval(discoInterval)
    elements.forEach((el) => {
      const original = originalStyles.get(el)
      if (original) {
        ;(el as HTMLElement).style.backgroundColor = original.backgroundColor
        ;(el as HTMLElement).style.color = original.color
        ;(el as HTMLElement).style.transition = original.transition
      }
    })
  }
}

// Função para aplicar efeito de gravidade
export function applyGravityEffect(): () => void {
  const elements = document.querySelectorAll("div, p, h1, h2, h3, h4, h5, h6, span, img, button")
  const originalStyles = new Map()

  elements.forEach((el) => {
    const computedStyle = window.getComputedStyle(el)
    originalStyles.set(el, {
      transform: computedStyle.transform,
      transition: computedStyle.transition,
      position: computedStyle.position,
    })
    ;(el as HTMLElement).style.transition = "transform 1s cubic-bezier(.17,.67,.83,.67)"

    setTimeout(() => {
      ;(el as HTMLElement).style.transform = `translateY(${window.innerHeight}px) rotate(${Math.random() * 20 - 10}deg)`
    }, Math.random() * 1000)
  })

  return () => {
    elements.forEach((el) => {
      const original = originalStyles.get(el)
      if (original) {
        ;(el as HTMLElement).style.transform = original.transform
        ;(el as HTMLElement).style.transition = original.transition
        ;(el as HTMLElement).style.position = original.position
      }
    })
  }
}

// Função para aplicar efeito Thanos (desintegração)
export function applyThanosEffect(): () => void {
  const elements = document.querySelectorAll("div, p, h1, h2, h3, h4, h5, h6, span, img, button")
  const originalStyles = new Map()

  elements.forEach((el) => {
    const computedStyle = window.getComputedStyle(el)
    originalStyles.set(el, {
      opacity: computedStyle.opacity,
      transition: computedStyle.transition,
      transform: computedStyle.transform,
    })
    ;(el as HTMLElement).style.transition = "opacity 2s, transform 2s"

    if (Math.random() > 0.5) {
      setTimeout(() => {
        ;(el as HTMLElement).style.opacity = "0"
        ;(el as HTMLElement).style.transform = "scale(0.5) rotate(15deg)"
      }, Math.random() * 2000)
    }
  })

  return () => {
    elements.forEach((el) => {
      const original = originalStyles.get(el)
      if (original) {
        ;(el as HTMLElement).style.opacity = original.opacity
        ;(el as HTMLElement).style.transition = original.transition
        ;(el as HTMLElement).style.transform = original.transform
      }
    })
  }
}

// Função para aplicar efeito arco-íris
export function applyRainbowEffect(): () => void {
  const style = document.createElement("style")
  style.id = "rainbow-effect"
  style.innerHTML = `
    * {
      animation: rainbow-text 2s infinite;
    }
    
    @keyframes rainbow-text {
      0% { color: #ff0000; }
      15% { color: #ff8000; }
      30% { color: #ffff00; }
      45% { color: #00ff00; }
      60% { color: #00ffff; }
      75% { color: #0000ff; }
      90% { color: #8000ff; }
      100% { color: #ff0000; }
    }
  `

  document.head.appendChild(style)

  return () => {
    const styleElement = document.getElementById("rainbow-effect")
    if (styleElement && document.head.contains(styleElement)) {
      document.head.removeChild(styleElement)
    }
  }
}

// Função para aplicar efeito de aniversário
export function applyBirthdayEffect(): () => void {
  // Adicionar confetti contínuo
  const confettiInterval = setInterval(() => {
    launchConfetti({
      particleCount: 30,
      spread: 60,
      origin: { y: Math.random() * 0.3 + 0.1 },
    })
  }, 1500)

  // Adicionar balões
  const balloons = document.createElement("div")
  balloons.id = "birthday-balloons"
  balloons.style.position = "fixed"
  balloons.style.top = "0"
  balloons.style.left = "0"
  balloons.style.width = "100%"
  balloons.style.height = "100%"
  balloons.style.pointerEvents = "none"
  balloons.style.zIndex = "9997"
  balloons.style.overflow = "hidden"

  for (let i = 0; i < Math.min(15, Math.floor(window.innerWidth / 100)); i++) {
    const balloon = document.createElement("div")
    balloon.style.position = "absolute"
    balloon.style.left = `${Math.random() * 90 + 5}%`
    balloon.style.top = `${Math.random() * 80 + 10}%`
    balloon.style.fontSize = `${Math.max(24, Math.min(48, window.innerWidth / 30))}px`
    balloon.textContent = "🎈"
    balloon.style.animation = `float ${5 + Math.random() * 5}s ease-in-out infinite`
    balloon.style.animationDelay = `${Math.random() * 2}s`
    balloons.appendChild(balloon)
  }

  document.body.appendChild(balloons)

  // Adicionar mensagem de aniversário
  const message = document.createElement("div")
  message.id = "birthday-message"
  message.style.position = "fixed"
  message.style.top = "50%"
  message.style.left = "50%"
  message.style.transform = "translate(-50%, -50%)"
  message.style.fontSize = `${Math.max(24, Math.min(48, window.innerWidth / 25))}px`
  message.style.fontWeight = "bold"
  message.style.textAlign = "center"
  message.style.color = "#FF0000"
  message.style.textShadow = "2px 2px 4px rgba(0,0,0,0.8)"
  message.style.zIndex = "9999"
  message.style.padding = "20px"
  message.style.backgroundColor = "rgba(255,255,255,0.9)"
  message.style.borderRadius = "15px"
  message.style.border = "3px solid #FF0000"
  message.innerHTML = "🎉 Feliz Aniversário! 🎉<br/>🎂🎁🎈"
  message.style.animation = "pulse-glow 2s infinite"

  document.body.appendChild(message)

  return () => {
    clearInterval(confettiInterval)
    const balloonsEl = document.getElementById("birthday-balloons")
    const messageEl = document.getElementById("birthday-message")

    if (balloonsEl && document.body.contains(balloonsEl)) {
      document.body.removeChild(balloonsEl)
    }
    if (messageEl && document.body.contains(messageEl)) {
      document.body.removeChild(messageEl)
    }
  }
}

// Hook para detectar sequências de teclas
export function useKeySequence(sequences: { [key: string]: string[] }, onMatch: (id: string) => void) {
  useEffect(() => {
    const pressed: string[] = []

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevenir ativação durante digitação em inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      pressed.push(e.code || e.key.toLowerCase())

      for (const [id, sequence] of Object.entries(sequences)) {
        const windowSize = sequence.length
        const windowPressed = pressed.slice(-windowSize)

        if (windowPressed.length === windowSize && windowPressed.every((key, i) => key === sequence[i])) {
          onMatch(id)
          pressed.length = 0
          break
        }
      }

      // Limitar o tamanho do array
      if (pressed.length > 20) {
        pressed.shift()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [sequences, onMatch])
}

// Função para criar Easter Eggs
export function createEasterEggs(): EasterEgg[] {
  return [
    {
      id: "konami",
      name: "Konami Code",
      description: "Ativa uma chuva de confetti",
      trigger: "↑↑↓↓←→←→BA",
      isActive: false,
      isUnlocked: false,
      activate: () => {
        launchConfetti()
        return () => {}
      },
      deactivate: () => {},
    },
    {
      id: "dev",
      name: "Modo Desenvolvedor",
      description: "Mostra informações técnicas do site",
      trigger: "dev",
      isActive: false,
      isUnlocked: false,
      activate: () => {
        const devInfo = document.createElement("div")
        devInfo.id = "dev-info"
        devInfo.style.position = "fixed"
        devInfo.style.bottom = "10px"
        devInfo.style.right = "10px"
        devInfo.style.backgroundColor = "rgba(0,0,0,0.8)"
        devInfo.style.color = "#00FF00"
        devInfo.style.padding = "10px"
        devInfo.style.borderRadius = "5px"
        devInfo.style.fontFamily = "monospace"
        devInfo.style.zIndex = "9999"
        devInfo.style.fontSize = "12px"

        const updateInfo = () => {
          const memory = (performance as any).memory
          devInfo.innerHTML = `
            <div>Next.js + React + Framer Motion</div>
            <div>Memory: ${memory ? Math.round(memory.usedJSHeapSize / 1048576) : 0}MB</div>
            <div>Window: ${window.innerWidth}x${window.innerHeight}</div>
            <div>DPR: ${window.devicePixelRatio}</div>
            <div>Network: ${(navigator as any).connection?.effectiveType || "unknown"}</div>
          `
        }

        updateInfo()
        const infoInterval = setInterval(updateInfo, 1000)
        document.body.appendChild(devInfo)

        return () => {
          clearInterval(infoInterval)
          const element = document.getElementById("dev-info")
          if (element && document.body.contains(element)) {
            document.body.removeChild(element)
          }
        }
      },
      deactivate: () => {
        const element = document.getElementById("dev-info")
        if (element && document.body.contains(element)) {
          document.body.removeChild(element)
        }
      },
    },
    {
      id: "matrix",
      name: "Modo Matrix",
      description: "Transforma o site em estilo Matrix",
      trigger: "matrix",
      isActive: false,
      isUnlocked: false,
      activate: () => applyMatrixEffect(),
      deactivate: () => {
        const canvas = document.getElementById("matrix-canvas")
        if (canvas && document.body.contains(canvas)) {
          document.body.removeChild(canvas)
        }
      },
    },
    {
      id: "disco",
      name: "Modo Disco",
      description: "Transforma o site em uma discoteca",
      trigger: "disco",
      isActive: false,
      isUnlocked: false,
      activate: () => applyDiscoEffect(),
      deactivate: () => {},
    },
    {
      id: "gravity",
      name: "Gravidade Zero",
      description: "Remove a gravidade do site",
      trigger: "grav",
      isActive: false,
      isUnlocked: false,
      activate: () => applyGravityEffect(),
      deactivate: () => {},
    },
    {
      id: "thanos",
      name: "Efeito Thanos",
      description: "Desintegra metade do site",
      trigger: "thanos",
      isActive: false,
      isUnlocked: false,
      activate: () => applyThanosEffect(),
      deactivate: () => {},
    },
    {
      id: "rainbow",
      name: "Modo Arco-íris",
      description: "Colore o site com as cores do arco-íris",
      trigger: "rainbow",
      isActive: false,
      isUnlocked: false,
      activate: () => applyRainbowEffect(),
      deactivate: () => {
        const style = document.getElementById("rainbow-effect")
        if (style && document.head.contains(style)) {
          document.head.removeChild(style)
        }
      },
    },
    {
      id: "birthday",
      name: "Modo Aniversário",
      description: "Celebra seu aniversário",
      trigger: "bday",
      isActive: false,
      isUnlocked: false,
      activate: () => applyBirthdayEffect(),
      deactivate: () => {},
    },
  ]
}
