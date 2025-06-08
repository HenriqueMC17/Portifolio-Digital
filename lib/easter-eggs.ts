"use client"

import { useEffect } from "react"
import confetti from "canvas-confetti"

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
  activate: () => void
  deactivate: () => void
}

// Sequência do Konami Code
const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
]

// Sequência para modo desenvolvedor
const DEV_CODE = ["d", "e", "v"]

// Sequência para modo Matrix
const MATRIX_CODE = ["m", "a", "t", "r", "i", "x"]

// Sequência para modo Disco
const DISCO_CODE = ["d", "i", "s", "c", "o"]

// Sequência para modo Gravidade
const GRAVITY_CODE = ["g", "r", "a", "v"]

// Sequência para efeito Thanos
const THANOS_CODE = ["t", "h", "a", "n", "o", "s"]

// Sequência para modo Arco-íris
const RAINBOW_CODE = ["r", "a", "i", "n", "b", "o", "w"]

// Sequência para modo Aniversário
const BIRTHDAY_CODE = ["b", "d", "a", "y"]

// Função para criar confetti
export function launchConfetti(options = {}) {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    ...options,
  })
}

// Função para criar confetti em formato de emoji
export function launchEmojiConfetti(emoji: string) {
  const canvas = document.createElement("canvas")
  canvas.width = 50
  canvas.height = 50
  const ctx = canvas.getContext("2d")

  if (ctx) {
    ctx.font = "30px serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(emoji, 25, 25)

    const image = new Image()
    image.src = canvas.toDataURL()

    confetti({
      particleCount: 30,
      spread: 70,
      shapes: [
        () => {
          return image
        },
      ],
    })
  }
}

// Função para aplicar efeito Matrix
export function applyMatrixEffect() {
  const canvas = document.createElement("canvas")
  canvas.id = "matrix-canvas"
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  canvas.style.position = "fixed"
  canvas.style.top = "0"
  canvas.style.left = "0"
  canvas.style.zIndex = "9999"
  canvas.style.pointerEvents = "none"
  canvas.style.opacity = "0.8"
  document.body.appendChild(canvas)

  const ctx = canvas.getContext("2d")
  if (!ctx) return

  const characters =
    "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const fontSize = 14
  const columns = canvas.width / fontSize

  const drops: number[] = []
  for (let i = 0; i < columns; i++) {
    drops[i] = 1
  }

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

  return () => {
    clearInterval(matrixInterval)
    document.body.removeChild(canvas)
  }
}

// Função para aplicar efeito Disco
export function applyDiscoEffect() {
  const colors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#8B00FF"]

  const elements = document.querySelectorAll("*")
  const originalStyles = new Map()

  elements.forEach((el) => {
    originalStyles.set(el, {
      backgroundColor: window.getComputedStyle(el).backgroundColor,
      color: window.getComputedStyle(el).color,
      transition: window.getComputedStyle(el).transition,
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
export function applyGravityEffect() {
  const elements = document.querySelectorAll("div, p, h1, h2, h3, h4, h5, h6, span, img, button")
  const originalStyles = new Map()

  elements.forEach((el) => {
    originalStyles.set(el, {
      transform: window.getComputedStyle(el).transform,
      transition: window.getComputedStyle(el).transition,
      position: window.getComputedStyle(el).position,
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
export function applyThanosEffect() {
  const elements = document.querySelectorAll("div, p, h1, h2, h3, h4, h5, h6, span, img, button")
  const originalStyles = new Map()
  const originalHTML = document.body.innerHTML

  elements.forEach((el) => {
    originalStyles.set(el, {
      opacity: window.getComputedStyle(el).opacity,
      transition: window.getComputedStyle(el).transition,
      transform: window.getComputedStyle(el).transform,
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
    document.body.innerHTML = originalHTML
  }
}

// Função para aplicar efeito arco-íris
export function applyRainbowEffect() {
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
    if (styleElement) {
      document.head.removeChild(styleElement)
    }
  }
}

// Função para aplicar efeito de aniversário
export function applyBirthdayEffect() {
  // Adicionar música de aniversário
  const audio = new Audio("/birthday-song.mp3")
  audio.loop = true
  audio.volume = 0.5
  audio.play()

  // Adicionar confetti contínuo
  const confettiInterval = setInterval(() => {
    launchConfetti({
      particleCount: 50,
      spread: 70,
      origin: { y: Math.random(), x: Math.random() },
    })
  }, 1000)

  // Adicionar balões
  const balloons = document.createElement("div")
  balloons.id = "birthday-balloons"
  balloons.style.position = "fixed"
  balloons.style.top = "0"
  balloons.style.left = "0"
  balloons.style.width = "100%"
  balloons.style.height = "100%"
  balloons.style.pointerEvents = "none"
  balloons.style.zIndex = "9999"

  for (let i = 0; i < 20; i++) {
    const balloon = document.createElement("div")
    balloon.style.position = "absolute"
    balloon.style.left = `${Math.random() * 100}%`
    balloon.style.top = `${Math.random() * 100}%`
    balloon.style.fontSize = "3rem"
    balloon.textContent = "🎈"
    balloon.style.animation = `float ${5 + Math.random() * 10}s ease-in-out infinite`
    balloons.appendChild(balloon)
  }

  document.body.appendChild(balloons)

  // Adicionar mensagem de aniversário
  const message = document.createElement("div")
  message.style.position = "fixed"
  message.style.top = "50%"
  message.style.left = "50%"
  message.style.transform = "translate(-50%, -50%)"
  message.style.fontSize = "3rem"
  message.style.fontWeight = "bold"
  message.style.textAlign = "center"
  message.style.color = "#FF0000"
  message.style.textShadow = "2px 2px 4px rgba(0,0,0,0.5)"
  message.style.zIndex = "10000"
  message.innerHTML = "Feliz Aniversário!<br>🎉🎂🎁"
  message.style.animation = "pulse-glow 2s infinite"

  document.body.appendChild(message)

  return () => {
    audio.pause()
    clearInterval(confettiInterval)
    document.body.removeChild(balloons)
    document.body.removeChild(message)
  }
}

// Hook para detectar sequências de teclas
export function useKeySequence(sequences: { [key: string]: string[] }, onMatch: (id: string) => void) {
  useEffect(() => {
    const pressed: string[] = []

    const handleKeyDown = (e: KeyboardEvent) => {
      pressed.push(e.key.toLowerCase())

      for (const [id, sequence] of Object.entries(sequences)) {
        const windowSize = sequence.length
        const windowPressed = pressed.slice(-windowSize)

        if (windowPressed.length === windowSize && windowPressed.every((key, i) => key === sequence[i].toLowerCase())) {
          onMatch(id)
          pressed.length = 0
          break
        }
      }

      // Limitar o tamanho do array para evitar vazamento de memória
      if (pressed.length > 20) {
        pressed.shift()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
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
      activate: () => launchConfetti(),
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

        const updateInfo = () => {
          devInfo.innerHTML = `
            <div>Next.js + React + Framer Motion</div>
            <div>FPS: ${Math.round(1000 / (performance.now() - lastTime))}</div>
            <div>Memory: ${Math.round(performance.memory?.usedJSHeapSize / 1048576 || 0)}MB</div>
            <div>Window: ${window.innerWidth}x${window.innerHeight}</div>
            <div>DPR: ${window.devicePixelRatio}</div>
            <div>Network: ${(navigator as any).connection?.effectiveType || "unknown"}</div>
          `
          lastTime = performance.now()
        }

        let lastTime = performance.now()
        const infoInterval = setInterval(updateInfo, 1000)
        document.body.appendChild(devInfo)

        return () => {
          clearInterval(infoInterval)
          const element = document.getElementById("dev-info")
          if (element) document.body.removeChild(element)
        }
      },
      deactivate: () => {
        const element = document.getElementById("dev-info")
        if (element) document.body.removeChild(element)
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
        if (canvas) document.body.removeChild(canvas)
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
        if (style) document.head.removeChild(style)
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
