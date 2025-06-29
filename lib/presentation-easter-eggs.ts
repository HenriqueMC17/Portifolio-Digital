"use client"

// Tipos de Easter Eggs específicos da apresentação
export type PresentationEasterEggType =
  | "konami_presentation"
  | "double_click_slide"
  | "long_press_title"
  | "shake_device"
  | "secret_gesture"
  | "time_travel"
  | "slide_shuffle"
  | "rainbow_mode"
  | "matrix_rain"
  | "confetti_explosion"

// Interface para Easter Eggs da apresentação
export interface PresentationEasterEgg {
  id: PresentationEasterEggType
  name: string
  description: string
  trigger: string
  isActive: boolean
  isUnlocked: boolean
  slideSpecific?: number // Slide específico onde funciona
  activate: (context?: any) => void | (() => void)
  deactivate: () => void
}

// Função para criar confetti com emojis personalizados
export function createEmojiConfetti(emojis: string[], count = 50) {
  const container = document.createElement("div")
  container.style.position = "fixed"
  container.style.top = "0"
  container.style.left = "0"
  container.style.width = "100vw"
  container.style.height = "100vh"
  container.style.pointerEvents = "none"
  container.style.zIndex = "9999"
  container.id = "emoji-confetti"

  document.body.appendChild(container)

  for (let i = 0; i < count; i++) {
    const emoji = document.createElement("div")
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)]
    emoji.style.position = "absolute"
    emoji.style.fontSize = `${Math.random() * 30 + 20}px`
    emoji.style.left = `${Math.random() * 100}%`
    emoji.style.top = "-50px"
    emoji.style.userSelect = "none"
    emoji.style.pointerEvents = "none"

    const duration = Math.random() * 3000 + 2000
    const rotation = Math.random() * 360
    const sway = Math.random() * 200 - 100

    emoji.animate(
      [
        {
          transform: `translateY(-50px) rotate(0deg) translateX(0px)`,
          opacity: 0,
        },
        {
          transform: `translateY(50px) rotate(${rotation / 4}deg) translateX(${sway / 4}px)`,
          opacity: 1,
          offset: 0.1,
        },
        {
          transform: `translateY(${window.innerHeight + 50}px) rotate(${rotation}deg) translateX(${sway}px)`,
          opacity: 0,
        },
      ],
      {
        duration,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    ).onfinish = () => {
      if (emoji.parentNode) {
        emoji.parentNode.removeChild(emoji)
      }
    }

    container.appendChild(emoji)
  }

  // Remove container after all animations
  setTimeout(() => {
    if (document.body.contains(container)) {
      document.body.removeChild(container)
    }
  }, 6000)
}

// Função para aplicar efeito Matrix Rain
export function applyMatrixRain(): () => void {
  const canvas = document.createElement("canvas")
  canvas.id = "matrix-rain"
  canvas.style.position = "fixed"
  canvas.style.top = "0"
  canvas.style.left = "0"
  canvas.style.width = "100vw"
  canvas.style.height = "100vh"
  canvas.style.zIndex = "9998"
  canvas.style.pointerEvents = "none"
  canvas.style.opacity = "0.7"

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  document.body.appendChild(canvas)

  const ctx = canvas.getContext("2d")
  if (!ctx) return () => {}

  const characters = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
  const fontSize = 14
  const columns = Math.floor(canvas.width / fontSize)
  const drops: number[] = Array(columns).fill(1)

  function draw() {
    if (!ctx) return

    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#00ff00"
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

  const interval = setInterval(draw, 33)

  return () => {
    clearInterval(interval)
    if (document.body.contains(canvas)) {
      document.body.removeChild(canvas)
    }
  }
}

// Função para aplicar modo rainbow
export function applyRainbowMode(): () => void {
  const style = document.createElement("style")
  style.id = "rainbow-mode"
  style.innerHTML = `
    @keyframes rainbow-bg {
      0% { filter: hue-rotate(0deg) saturate(1.5); }
      25% { filter: hue-rotate(90deg) saturate(1.8); }
      50% { filter: hue-rotate(180deg) saturate(2); }
      75% { filter: hue-rotate(270deg) saturate(1.8); }
      100% { filter: hue-rotate(360deg) saturate(1.5); }
    }
    
    @keyframes rainbow-text {
      0% { color: #ff0000; text-shadow: 0 0 10px #ff0000; }
      16% { color: #ff8000; text-shadow: 0 0 10px #ff8000; }
      33% { color: #ffff00; text-shadow: 0 0 10px #ffff00; }
      50% { color: #00ff00; text-shadow: 0 0 10px #00ff00; }
      66% { color: #00ffff; text-shadow: 0 0 10px #00ffff; }
      83% { color: #0000ff; text-shadow: 0 0 10px #0000ff; }
      100% { color: #ff00ff; text-shadow: 0 0 10px #ff00ff; }
    }
    
    .rainbow-mode-active {
      animation: rainbow-bg 3s infinite linear;
    }
    
    .rainbow-mode-active * {
      animation: rainbow-text 2s infinite linear;
    }
  `

  document.head.appendChild(style)
  document.body.classList.add("rainbow-mode-active")

  return () => {
    document.body.classList.remove("rainbow-mode-active")
    const styleElement = document.getElementById("rainbow-mode")
    if (styleElement && document.head.contains(styleElement)) {
      document.head.removeChild(styleElement)
    }
  }
}

// Função para detectar shake do dispositivo
export function useDeviceShake(onShake: () => void, threshold = 15) {
  if (typeof window === "undefined") return

  let lastX = 0,
    lastY = 0,
    lastZ = 0
  let lastUpdate = 0

  const handleMotion = (event: DeviceMotionEvent) => {
    const acceleration = event.accelerationIncludingGravity
    if (!acceleration) return

    const curTime = Date.now()
    if (curTime - lastUpdate > 100) {
      const diffTime = curTime - lastUpdate
      lastUpdate = curTime

      const x = acceleration.x || 0
      const y = acceleration.y || 0
      const z = acceleration.z || 0

      const speed = (Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime) * 10000

      if (speed > threshold) {
        onShake()
      }

      lastX = x
      lastY = y
      lastZ = z
    }
  }

  window.addEventListener("devicemotion", handleMotion)

  return () => {
    window.removeEventListener("devicemotion", handleMotion)
  }
}

// Função para criar efeito de time travel
export function createTimeTravelEffect(): () => void {
  const overlay = document.createElement("div")
  overlay.id = "time-travel-overlay"
  overlay.style.position = "fixed"
  overlay.style.top = "0"
  overlay.style.left = "0"
  overlay.style.width = "100vw"
  overlay.style.height = "100vh"
  overlay.style.background = "radial-gradient(circle, transparent 0%, rgba(0,0,0,0.8) 70%)"
  overlay.style.zIndex = "9997"
  overlay.style.pointerEvents = "none"
  overlay.style.opacity = "0"
  overlay.style.transition = "opacity 0.5s ease"

  document.body.appendChild(overlay)

  // Animate overlay
  setTimeout(() => {
    overlay.style.opacity = "1"
  }, 100)

  // Create time particles
  const particleContainer = document.createElement("div")
  particleContainer.style.position = "fixed"
  particleContainer.style.top = "0"
  particleContainer.style.left = "0"
  particleContainer.style.width = "100vw"
  particleContainer.style.height = "100vh"
  particleContainer.style.zIndex = "9998"
  particleContainer.style.pointerEvents = "none"

  document.body.appendChild(particleContainer)

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div")
    particle.style.position = "absolute"
    particle.style.width = "2px"
    particle.style.height = "20px"
    particle.style.background = "linear-gradient(to bottom, transparent, #00ffff, transparent)"
    particle.style.left = `${Math.random() * 100}%`
    particle.style.top = `${Math.random() * 100}%`

    particle.animate(
      [
        {
          transform: "translateY(0px) scale(1)",
          opacity: 0,
        },
        {
          transform: "translateY(-50px) scale(1.5)",
          opacity: 1,
          offset: 0.5,
        },
        {
          transform: "translateY(-100px) scale(0.5)",
          opacity: 0,
        },
      ],
      {
        duration: 2000 + Math.random() * 1000,
        iterations: Number.POSITIVE_INFINITY,
        delay: Math.random() * 1000,
      },
    )

    particleContainer.appendChild(particle)
  }

  return () => {
    if (document.body.contains(overlay)) {
      overlay.style.opacity = "0"
      setTimeout(() => {
        if (document.body.contains(overlay)) {
          document.body.removeChild(overlay)
        }
      }, 500)
    }
    if (document.body.contains(particleContainer)) {
      document.body.removeChild(particleContainer)
    }
  }
}

// Hook para detectar gestos secretos
export function useSecretGesture(onGesture: () => void) {
  if (typeof window === "undefined") return

  let touchSequence: { x: number; y: number; time: number }[] = []
  const maxSequenceLength = 5
  const gestureTimeout = 3000

  const handleTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0]
    const now = Date.now()

    // Limpar sequência antiga
    touchSequence = touchSequence.filter((t) => now - t.time < gestureTimeout)

    touchSequence.push({
      x: touch.clientX,
      y: touch.clientY,
      time: now,
    })

    if (touchSequence.length > maxSequenceLength) {
      touchSequence.shift()
    }

    // Verificar padrão: círculo
    if (touchSequence.length >= 4) {
      const isCircle = checkCirclePattern(touchSequence)
      if (isCircle) {
        onGesture()
        touchSequence = []
      }
    }
  }

  const checkCirclePattern = (sequence: { x: number; y: number; time: number }[]) => {
    if (sequence.length < 4) return false

    const centerX = sequence.reduce((sum, p) => sum + p.x, 0) / sequence.length
    const centerY = sequence.reduce((sum, p) => sum + p.y, 0) / sequence.length

    let totalAngle = 0
    for (let i = 1; i < sequence.length; i++) {
      const prev = sequence[i - 1]
      const curr = sequence[i]

      const angle1 = Math.atan2(prev.y - centerY, prev.x - centerX)
      const angle2 = Math.atan2(curr.y - centerY, curr.x - centerX)

      let angleDiff = angle2 - angle1
      if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI
      if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI

      totalAngle += angleDiff
    }

    return Math.abs(totalAngle) > Math.PI * 1.5 // Mais de 270 graus
  }

  window.addEventListener("touchstart", handleTouchStart)

  return () => {
    window.removeEventListener("touchstart", handleTouchStart)
  }
}

// Função para criar Easter Eggs da apresentação
export function createPresentationEasterEggs(): PresentationEasterEgg[] {
  return [
    {
      id: "konami_presentation",
      name: "Konami Code Presentation",
      description: "Ativa modo especial com efeitos visuais únicos",
      trigger: "↑↑↓↓←→←→BA durante apresentação",
      isActive: false,
      isUnlocked: false,
      activate: () => {
        createEmojiConfetti(["🎮", "🕹️", "👾", "🎯", "⭐"], 100)
        const cleanup = applyRainbowMode()
        setTimeout(cleanup, 10000)
        return cleanup
      },
      deactivate: () => {},
    },
    {
      id: "double_click_slide",
      name: "Slide Mágico",
      description: "Duplo clique no título revela easter egg",
      trigger: "Duplo clique no título do slide",
      isActive: false,
      isUnlocked: false,
      activate: () => {
        createEmojiConfetti(["✨", "🎭", "🎪", "🎨", "🌟"], 30)
      },
      deactivate: () => {},
    },
    {
      id: "long_press_title",
      name: "Pressão Mágica",
      description: "Pressione e segure o título por 3 segundos",
      trigger: "Long press no título",
      isActive: false,
      isUnlocked: false,
      activate: () => {
        const cleanup = createTimeTravelEffect()
        setTimeout(cleanup, 5000)
        return cleanup
      },
      deactivate: () => {},
    },
    {
      id: "shake_device",
      name: "Shake to Surprise",
      description: "Balance o dispositivo para ativar",
      trigger: "Balançar dispositivo",
      isActive: false,
      isUnlocked: false,
      activate: () => {
        createEmojiConfetti(["📱", "💫", "🌪️", "⚡", "🎊"], 50)
      },
      deactivate: () => {},
    },
    {
      id: "secret_gesture",
      name: "Gesto Secreto",
      description: "Desenhe um círculo na tela",
      trigger: "Gesto circular na tela",
      isActive: false,
      isUnlocked: false,
      activate: () => {
        const cleanup = applyMatrixRain()
        setTimeout(cleanup, 8000)
        return cleanup
      },
      deactivate: () => {},
    },
    {
      id: "time_travel",
      name: "Viagem no Tempo",
      description: "Pressione T + I + M + E simultaneamente",
      trigger: "T+I+M+E",
      isActive: false,
      isUnlocked: false,
      slideSpecific: 0, // Apenas no slide de introdução
      activate: () => {
        const cleanup = createTimeTravelEffect()
        createEmojiConfetti(["⏰", "🕰️", "⏳", "🔮", "🌌"], 40)
        setTimeout(cleanup, 7000)
        return cleanup
      },
      deactivate: () => {},
    },
    {
      id: "slide_shuffle",
      name: "Embaralhador",
      description: "Digite 'shuffle' durante a apresentação",
      trigger: "Digite 'shuffle'",
      isActive: false,
      isUnlocked: false,
      activate: (context: { shuffleSlides?: () => void }) => {
        if (context?.shuffleSlides) {
          context.shuffleSlides()
          createEmojiConfetti(["🔀", "🎲", "🃏", "🎰", "🎯"], 25)
        }
      },
      deactivate: () => {},
    },
    {
      id: "rainbow_mode",
      name: "Modo Arco-íris",
      description: "Pressione R + A + I + N + B + O + W",
      trigger: "R+A+I+N+B+O+W",
      isActive: false,
      isUnlocked: false,
      activate: () => {
        const cleanup = applyRainbowMode()
        createEmojiConfetti(["🌈", "🦄", "✨", "🎨", "🌟"], 60)
        setTimeout(cleanup, 15000)
        return cleanup
      },
      deactivate: () => {},
    },
    {
      id: "matrix_rain",
      name: "Matrix Rain",
      description: "Digite 'matrix' durante a apresentação",
      trigger: "Digite 'matrix'",
      isActive: false,
      isUnlocked: false,
      activate: () => {
        const cleanup = applyMatrixRain()
        createEmojiConfetti(["💊", "🕶️", "💻", "🔋", "⚡"], 35)
        setTimeout(cleanup, 12000)
        return cleanup
      },
      deactivate: () => {},
    },
    {
      id: "confetti_explosion",
      name: "Explosão de Confetti",
      description: "Clique 10 vezes rapidamente em qualquer lugar",
      trigger: "10 cliques rápidos",
      isActive: false,
      isUnlocked: false,
      activate: () => {
        // Múltiplas explosões de confetti
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            createEmojiConfetti(["🎉", "🎊", "🥳", "🎈", "🎁", "🍾", "✨"], 40)
          }, i * 500)
        }
      },
      deactivate: () => {},
    },
  ]
}
