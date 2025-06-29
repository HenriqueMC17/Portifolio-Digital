"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, type PanInfo } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  X,
  Presentation,
  Clock,
  User,
  Code,
  Briefcase,
  Award,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Calendar,
  TrendingUp,
  Target,
  Zap,
  Coffee,
  Heart,
  Star,
  CheckCircle,
  ArrowRight,
  Globe,
  Database,
  Server,
  BookOpen,
  Maximize2,
  Volume2,
  VolumeX,
  Sparkles,
  Rocket,
  CloudLightningIcon as Lightning,
  Settings,
  Shuffle,
  Hand,
  ContactIcon as Touch,
  BarChart3,
  Trophy,
  Gamepad2,
} from "lucide-react"
import {
  createPresentationEasterEggs,
  useDeviceShake,
  useSecretGesture,
  type PresentationEasterEgg,
  type PresentationEasterEggType,
} from "@/lib/presentation-easter-eggs"
import { usePresentationAnalytics } from "@/lib/presentation-analytics"
import { useAnalytics } from "@/components/analytics-provider"

interface PresentationSlide {
  id: string
  title: string
  subtitle?: string
  content: React.ReactNode
  duration: number
  background: string
  textColor?: string
  animation?: string
  transitionType?: TransitionType
}

type TransitionType =
  | "slide"
  | "fade"
  | "zoom"
  | "flip"
  | "cube"
  | "spiral"
  | "wave"
  | "dissolve"
  | "curtain"
  | "origami"

// Sound effects class
class SoundManager {
  private audioContext: AudioContext | null = null
  private sounds: Map<string, AudioBuffer> = new Map()
  private enabled = true

  constructor() {
    if (typeof window !== "undefined") {
      this.initAudioContext()
      this.createSounds()
    }
  }

  private initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    } catch (error) {
      console.warn("Web Audio API not supported:", error)
    }
  }

  private async createSounds() {
    if (!this.audioContext) return

    const soundDefinitions = {
      slideTransition: { frequency: 440, duration: 0.3, type: "sine" as OscillatorType },
      buttonClick: { frequency: 800, duration: 0.1, type: "square" as OscillatorType },
      slideChange: { frequency: 660, duration: 0.2, type: "triangle" as OscillatorType },
      success: { frequency: 523, duration: 0.4, type: "sine" as OscillatorType },
      hover: { frequency: 1000, duration: 0.05, type: "sine" as OscillatorType },
      swipe: { frequency: 300, duration: 0.15, type: "sawtooth" as OscillatorType },
      whoosh: { frequency: 200, duration: 0.25, type: "triangle" as OscillatorType },
      pop: { frequency: 1200, duration: 0.08, type: "square" as OscillatorType },
      easterEgg: { frequency: 880, duration: 0.5, type: "sine" as OscillatorType },
      achievement: { frequency: 1320, duration: 0.6, type: "triangle" as OscillatorType },
    }

    for (const [name, config] of Object.entries(soundDefinitions)) {
      const buffer = await this.createTone(config.frequency, config.duration, config.type)
      if (buffer) {
        this.sounds.set(name, buffer)
      }
    }
  }

  private async createTone(frequency: number, duration: number, type: OscillatorType): Promise<AudioBuffer | null> {
    if (!this.audioContext) return null

    const sampleRate = this.audioContext.sampleRate
    const length = sampleRate * duration
    const buffer = this.audioContext.createBuffer(1, length, sampleRate)
    const data = buffer.getChannelData(0)

    for (let i = 0; i < length; i++) {
      const t = i / sampleRate
      let value = 0

      switch (type) {
        case "sine":
          value = Math.sin(2 * Math.PI * frequency * t)
          break
        case "square":
          value = Math.sign(Math.sin(2 * Math.PI * frequency * t))
          break
        case "triangle":
          value = (2 / Math.PI) * Math.asin(Math.sin(2 * Math.PI * frequency * t))
          break
        case "sawtooth":
          value = 2 * (t * frequency - Math.floor(t * frequency + 0.5))
          break
      }

      // Apply envelope for smoother sound
      const envelope = Math.exp(-t * 3) // Exponential decay
      data[i] = value * envelope * 0.1 // Reduce volume
    }

    return buffer
  }

  play(soundName: string, volume = 0.3) {
    if (!this.enabled || !this.audioContext || !this.sounds.has(soundName)) return

    try {
      const buffer = this.sounds.get(soundName)!
      const source = this.audioContext.createBufferSource()
      const gainNode = this.audioContext.createGain()

      source.buffer = buffer
      gainNode.gain.value = volume

      source.connect(gainNode)
      gainNode.connect(this.audioContext.destination)

      source.start()
    } catch (error) {
      console.warn("Error playing sound:", error)
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled
  }

  isEnabled() {
    return this.enabled
  }
}

const transitionVariants = {
  slide: {
    enter: (direction: number) => ({
      x: direction > 0 ? 1200 : -1200,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 90 : -90,
      filter: "blur(10px)",
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1200 : -1200,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 90 : -90,
      filter: "blur(10px)",
    }),
  },
  fade: {
    enter: () => ({
      opacity: 0,
      scale: 1.1,
      filter: "blur(20px)",
    }),
    center: {
      zIndex: 1,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: () => ({
      zIndex: 0,
      opacity: 0,
      scale: 0.9,
      filter: "blur(20px)",
    }),
  },
  zoom: {
    enter: (direction: number) => ({
      scale: direction > 0 ? 0.3 : 2,
      opacity: 0,
      rotate: direction > 0 ? -180 : 180,
      filter: "blur(15px)",
    }),
    center: {
      zIndex: 1,
      scale: 1,
      opacity: 1,
      rotate: 0,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      zIndex: 0,
      scale: direction < 0 ? 0.3 : 2,
      opacity: 0,
      rotate: direction < 0 ? -180 : 180,
      filter: "blur(15px)",
    }),
  },
  flip: {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 180 : -180,
      opacity: 0,
      scale: 0.8,
      z: -1000,
    }),
    center: {
      zIndex: 1,
      rotateY: 0,
      opacity: 1,
      scale: 1,
      z: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      rotateY: direction < 0 ? 180 : -180,
      opacity: 0,
      scale: 0.8,
      z: -1000,
    }),
  },
  cube: {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      transformOrigin: direction > 0 ? "left center" : "right center",
    }),
    center: {
      zIndex: 1,
      rotateY: 0,
      x: 0,
      opacity: 1,
      transformOrigin: "center center",
    },
    exit: (direction: number) => ({
      zIndex: 0,
      rotateY: direction < 0 ? 90 : -90,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transformOrigin: direction < 0 ? "left center" : "right center",
    }),
  },
  spiral: {
    enter: (direction: number) => ({
      scale: 0,
      rotate: direction > 0 ? 720 : -720,
      opacity: 0,
      x: direction > 0 ? 500 : -500,
      y: direction > 0 ? 500 : -500,
    }),
    center: {
      zIndex: 1,
      scale: 1,
      rotate: 0,
      opacity: 1,
      x: 0,
      y: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      scale: 0,
      rotate: direction < 0 ? 720 : -720,
      opacity: 0,
      x: direction < 0 ? 500 : -500,
      y: direction < 0 ? 500 : -500,
    }),
  },
  wave: {
    enter: (direction: number) => ({
      y: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scaleY: 0.3,
      skewX: direction > 0 ? 45 : -45,
      filter: "blur(10px)",
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
      scaleY: 1,
      skewX: 0,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      zIndex: 0,
      y: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scaleY: 0.3,
      skewX: direction < 0 ? 45 : -45,
      filter: "blur(10px)",
    }),
  },
  dissolve: {
    enter: () => ({
      opacity: 0,
      scale: 1.2,
      filter: "blur(30px) brightness(0.5)",
      clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    }),
    center: {
      zIndex: 1,
      opacity: 1,
      scale: 1,
      filter: "blur(0px) brightness(1)",
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    },
    exit: () => ({
      zIndex: 0,
      opacity: 0,
      scale: 0.8,
      filter: "blur(30px) brightness(0.5)",
      clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
    }),
  },
  curtain: {
    enter: (direction: number) => ({
      scaleX: 0,
      opacity: 0,
      transformOrigin: direction > 0 ? "left center" : "right center",
      filter: "blur(5px)",
    }),
    center: {
      zIndex: 1,
      scaleX: 1,
      opacity: 1,
      transformOrigin: "center center",
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      zIndex: 0,
      scaleX: 0,
      opacity: 0,
      transformOrigin: direction < 0 ? "left center" : "right center",
      filter: "blur(5px)",
    }),
  },
  origami: {
    enter: (direction: number) => ({
      rotateX: direction > 0 ? 90 : -90,
      rotateY: direction > 0 ? 45 : -45,
      scale: 0.5,
      opacity: 0,
      transformOrigin: "center bottom",
      filter: "blur(8px)",
    }),
    center: {
      zIndex: 1,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      opacity: 1,
      transformOrigin: "center center",
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      zIndex: 0,
      rotateX: direction < 0 ? 90 : -90,
      rotateY: direction < 0 ? 45 : -45,
      scale: 0.5,
      opacity: 0,
      transformOrigin: "center top",
      filter: "blur(8px)",
    }),
  },
}

const transitionTimings = {
  slide: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  fade: { duration: 1.2, ease: [0.4, 0, 0.2, 1] },
  zoom: { duration: 1.0, ease: [0.68, -0.55, 0.265, 1.55] },
  flip: { duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] },
  cube: { duration: 1.6, ease: [0.77, 0, 0.175, 1] },
  spiral: { duration: 2.0, ease: [0.68, -0.55, 0.265, 1.55] },
  wave: { duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] },
  dissolve: { duration: 2.2, ease: [0.4, 0, 0.2, 1] },
  curtain: { duration: 1.5, ease: [0.77, 0, 0.175, 1] },
  origami: { duration: 2.4, ease: [0.25, 0.46, 0.45, 0.94] },
}

const backgroundVariants = {
  initial: { scale: 1.2, opacity: 0, rotate: -5 },
  animate: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    rotate: 5,
    transition: {
      duration: 1.5,
    },
  },
}

const textRevealVariants = {
  hidden: {
    opacity: 0,
    y: 100,
    rotateX: -90,
    filter: "blur(10px)",
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.15,
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

const floatingAnimation = {
  y: [-15, 15, -15],
  rotate: [-2, 2, -2],
  transition: {
    duration: 4,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
}

const pulseAnimation = {
  scale: [1, 1.1, 1],
  boxShadow: [
    "0 0 0 0 rgba(255, 255, 255, 0.4)",
    "0 0 0 20px rgba(255, 255, 255, 0)",
    "0 0 0 0 rgba(255, 255, 255, 0)",
  ],
  transition: {
    duration: 2.5,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
}

const glowAnimation = {
  boxShadow: [
    "0 0 20px rgba(255, 255, 255, 0.3)",
    "0 0 40px rgba(255, 255, 255, 0.6)",
    "0 0 20px rgba(255, 255, 255, 0.3)",
  ],
  transition: {
    duration: 3,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
}

const particleVariants = {
  animate: {
    y: [0, -100, 0],
    x: [0, Math.random() * 100 - 50, 0],
    opacity: [0, 1, 0],
    scale: [0, 1, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      delay: Math.random() * 2,
    },
  },
}

export function PresentationMode() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [progress, setProgress] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentTransition, setCurrentTransition] = useState<TransitionType>("slide")
  const [showTransitionMenu, setShowTransitionMenu] = useState(false)
  const [randomTransitions, setRandomTransitions] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showGestureHint, setShowGestureHint] = useState(false)
  const [dragProgress, setDragProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showEasterEggPanel, setShowEasterEggPanel] = useState(false)

  // Easter Eggs state
  const [easterEggs, setEasterEggs] = useState<PresentationEasterEgg[]>(createPresentationEasterEggs())
  const [activeEasterEggs, setActiveEasterEggs] = useState<PresentationEasterEggType[]>([])
  const [unlockedEasterEggs, setUnlockedEasterEggs] = useState<PresentationEasterEggType[]>([])
  const [clickCount, setClickCount] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(0)
  const [keySequence, setKeySequence] = useState<string[]>([])
  const [typedSequence, setTypedSequence] = useState("")

  const containerRef = useRef<HTMLDivElement>(null)
  const soundManagerRef = useRef<SoundManager | null>(null)
  const presentationAnalytics = usePresentationAnalytics()
  const { trackEvent } = useAnalytics()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 30 })
  const rotateX = useTransform(smoothMouseY, [-300, 300], [8, -8])
  const rotateY = useTransform(smoothMouseX, [-300, 300], [-8, 8])

  // Initialize sound manager
  useEffect(() => {
    if (typeof window !== "undefined") {
      soundManagerRef.current = new SoundManager()
    }
  }, [])

  // Update sound manager when sound setting changes
  useEffect(() => {
    if (soundManagerRef.current) {
      soundManagerRef.current.setEnabled(soundEnabled)
    }
  }, [soundEnabled])

  // Load unlocked easter eggs from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("presentation_easter_eggs")
        if (saved) {
          const parsed = JSON.parse(saved) as PresentationEasterEggType[]
          setUnlockedEasterEggs(parsed)
          setEasterEggs((prev) =>
            prev.map((egg) => ({
              ...egg,
              isUnlocked: parsed.includes(egg.id),
            })),
          )
        }
      } catch (error) {
        console.error("Error loading easter eggs:", error)
      }
    }
  }, [])

  // Save unlocked easter eggs to localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && unlockedEasterEggs.length > 0) {
      localStorage.setItem("presentation_easter_eggs", JSON.stringify(unlockedEasterEggs))
    }
  }, [unlockedEasterEggs])

  const transitionTypes: { type: TransitionType; name: string; icon: string }[] = [
    { type: "slide", name: "Deslizar", icon: "➡️" },
    { type: "fade", name: "Desvanecer", icon: "🌫️" },
    { type: "zoom", name: "Zoom", icon: "🔍" },
    { type: "flip", name: "Virar", icon: "🔄" },
    { type: "cube", name: "Cubo", icon: "🎲" },
    { type: "spiral", name: "Espiral", icon: "🌀" },
    { type: "wave", name: "Onda", icon: "🌊" },
    { type: "dissolve", name: "Dissolver", icon: "✨" },
    { type: "curtain", name: "Cortina", icon: "🎭" },
    { type: "origami", name: "Origami", icon: "📄" },
  ]

  const getRandomTransition = (): TransitionType => {
    const types = transitionTypes.map((t) => t.type)
    return types[Math.floor(Math.random() * types.length)]
  }

  const playSound = (soundName: string, volume?: number) => {
    if (soundManagerRef.current && soundEnabled) {
      soundManagerRef.current.play(soundName, volume)
    }
  }

  // Easter Egg Functions
  const activateEasterEgg = useCallback(
    (id: PresentationEasterEggType, context?: any) => {
      const egg = easterEggs.find((e) => e.id === id)
      if (!egg) return

      // Check if slide-specific
      if (egg.slideSpecific !== undefined && egg.slideSpecific !== currentSlide) {
        return
      }

      // Activate easter egg
      const cleanup = egg.activate(context)

      // Track analytics
      if (presentationAnalytics) {
        presentationAnalytics.trackEasterEgg(id, currentSlide)
      }
      trackEvent("easter_egg_activated", { id, slideIndex: currentSlide })

      // Play sound
      playSound("easterEgg", 0.4)

      // Update state
      setActiveEasterEggs((prev) => [...prev.filter((eggId) => eggId !== id), id])

      if (!egg.isUnlocked) {
        setUnlockedEasterEggs((prev) => [...prev, id])
        setEasterEggs((prev) => prev.map((e) => (e.id === id ? { ...e, isUnlocked: true, isActive: true } : e)))
        playSound("achievement", 0.5)
      }

      // Auto-deactivate after some time
      if (cleanup && typeof cleanup === "function") {
        setTimeout(() => {
          cleanup()
          setActiveEasterEggs((prev) => prev.filter((eggId) => eggId !== id))
        }, 10000)
      }
    },
    [easterEggs, currentSlide, presentationAnalytics, trackEvent],
  )

  // Device shake detection
  useDeviceShake(() => {
    activateEasterEgg("shake_device")
  })

  // Secret gesture detection
  useSecretGesture(() => {
    activateEasterEgg("secret_gesture")
  })

  // Click counter for confetti explosion
  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      const now = Date.now()

      if (now - lastClickTime < 300) {
        // Within 300ms
        setClickCount((prev) => prev + 1)
      } else {
        setClickCount(1)
      }

      setLastClickTime(now)

      if (clickCount >= 9) {
        // 10 clicks total
        activateEasterEgg("confetti_explosion")
        setClickCount(0)
      }
    },
    [clickCount, lastClickTime, activateEasterEgg],
  )

  // Double click detection for slide magic
  const handleDoubleClick = useCallback(
    (event: React.MouseEvent) => {
      const target = event.target as HTMLElement
      if (target.tagName === "H1" || target.tagName === "H2") {
        activateEasterEgg("double_click_slide")
      }
    },
    [activateEasterEgg],
  )

  // Long press detection
  const handleLongPress = useCallback(
    (element: HTMLElement) => {
      let pressTimer: NodeJS.Timeout

      const startPress = () => {
        pressTimer = setTimeout(() => {
          if (element.tagName === "H1" || element.tagName === "H2") {
            activateEasterEgg("long_press_title")
          }
        }, 3000)
      }

      const endPress = () => {
        clearTimeout(pressTimer)
      }

      element.addEventListener("mousedown", startPress)
      element.addEventListener("mouseup", endPress)
      element.addEventListener("mouseleave", endPress)
      element.addEventListener("touchstart", startPress)
      element.addEventListener("touchend", endPress)

      return () => {
        element.removeEventListener("mousedown", startPress)
        element.removeEventListener("mouseup", endPress)
        element.removeEventListener("mouseleave", startPress)
        element.removeEventListener("touchstart", endPress)
        element.removeEventListener("touchend", endPress)
      }
    },
    [activateEasterEgg],
  )

  const presentationSlides: PresentationSlide[] = [
    {
      id: "intro",
      title: "Henrique Monteiro Cardoso",
      subtitle: "Desenvolvedor Full Stack",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      textColor: "text-white",
      animation: "fade-up",
      transitionType: "spiral",
      content: (
        <div className="w-full max-w-6xl mx-auto px-4 relative">
          {/* Floating Particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              variants={particleVariants}
              animate="animate"
            />
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="text-center space-y-8 relative z-10"
          >
            <motion.div
              initial={{ scale: 0, rotateY: 180, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              transition={{
                duration: 2,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.3,
              }}
              className="relative mb-8"
              onDoubleClick={handleDoubleClick}
              ref={(el) => el && handleLongPress(el)}
            >
              <motion.div
                animate={{
                  ...floatingAnimation,
                  ...glowAnimation,
                }}
                className="w-40 h-40 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30 shadow-2xl relative overflow-hidden"
                style={{
                  background: "linear-gradient(145deg, rgba(255,255,255,0.25), rgba(255,255,255,0.1))",
                }}
              >
                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                />

                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1, type: "spring", stiffness: 200 }}
                >
                  <User className="h-20 w-20 text-white relative z-10" />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
                className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg"
                animate={pulseAnimation}
              >
                <CheckCircle className="h-8 w-8 text-white" />
              </motion.div>

              {/* Orbiting Elements */}
              {[Sparkles, Rocket, Lightning].map((Icon, index) => (
                <motion.div
                  key={index}
                  className="absolute w-8 h-8 text-white/60"
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                  animate={{
                    rotate: [0, 360],
                    x: Math.cos((index * 120 * Math.PI) / 180) * 100,
                    y: Math.sin((index * 120 * Math.PI) / 180) * 100,
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                    delay: index * 0.5,
                  }}
                >
                  <Icon className="w-full h-full" />
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="space-y-6">
              <motion.div
                variants={textRevealVariants}
                initial="hidden"
                animate="visible"
                custom={0}
                className="space-y-3"
              >
                <motion.p
                  className="text-xl md:text-2xl text-white/90 font-light"
                  animate={{
                    opacity: [0.7, 1, 0.7],
                    textShadow: [
                      "0 0 10px rgba(255,255,255,0.3)",
                      "0 0 20px rgba(255,255,255,0.6)",
                      "0 0 10px rgba(255,255,255,0.3)",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                >
                  Estudante de Análise e Desenvolvimento de Sistemas
                </motion.p>

                <motion.div
                  variants={textRevealVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                  className="flex items-center justify-center gap-4 text-white/80 flex-wrap"
                >
                  {[
                    { icon: MapPin, text: "Sorocaba, SP" },
                    { icon: Calendar, text: "21 anos" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.text}
                      className="flex items-center gap-2"
                      whileHover={{
                        scale: 1.1,
                        color: "#ffffff",
                        textShadow: "0 0 10px rgba(255,255,255,0.8)",
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: index }}
                      >
                        <item.icon className="h-4 w-4" />
                      </motion.div>
                      <span>{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                variants={textRevealVariants}
                initial="hidden"
                animate="visible"
                custom={2}
                className="flex justify-center gap-8 flex-wrap"
              >
                {[
                  { value: "2+", label: "Anos de Experiência", delay: 0, color: "from-blue-400 to-blue-600" },
                  { value: "10+", label: "Projetos", delay: 0.2, color: "from-green-400 to-green-600" },
                  { value: "18+", label: "Certificações", delay: 0.4, color: "from-purple-400 to-purple-600" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ y: 100, opacity: 0, scale: 0 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{
                      delay: 1.5 + stat.delay,
                      duration: 1,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="text-center relative"
                    whileHover={{
                      scale: 1.1,
                      y: -10,
                      transition: { type: "spring", stiffness: 400 },
                    }}
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl opacity-20 blur-xl`}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                    />
                    <motion.div
                      className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
                      animate={pulseAnimation}
                      style={{ animationDelay: `${index * 0.5}s` }}
                    >
                      <motion.div
                        className="text-2xl md:text-3xl font-bold text-white mb-1"
                        animate={{
                          scale: [1, 1.1, 1],
                          textShadow: [
                            "0 0 10px rgba(255,255,255,0.5)",
                            "0 0 20px rgba(255,255,255,0.8)",
                            "0 0 10px rgba(255,255,255,0.5)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-white/80 text-sm">{stat.label}</div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ y: 150, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.5, duration: 1.5, type: "spring" }}
              className="flex justify-center gap-4 flex-wrap"
            >
              {["Java", "JavaScript", "TypeScript", "React"].map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ scale: 0, rotate: -180, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{
                    delay: 3 + index * 0.15,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{
                    scale: 1.3,
                    rotate: [0, -5, 5, 0],
                    y: -10,
                    boxShadow: "0 10px 30px rgba(255,255,255,0.3)",
                    transition: { duration: 0.3 },
                  }}
                  className="relative"
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-full blur-lg"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                  />
                  <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 backdrop-blur-sm relative z-10 font-semibold">
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      ),
      duration: 12,
    },
    {
      id: "skills",
      title: "Stack Tecnológico",
      subtitle: "Habilidades Técnicas Completas",
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      textColor: "text-white",
      animation: "slide-left",
      transitionType: "cube",
      content: (
        <div className="w-full max-w-7xl mx-auto px-4 relative">
          {/* Animated Background Elements */}
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-45" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative z-10"
          >
            <motion.div
              initial={{ x: -200, opacity: 0, rotateY: -45 }}
              animate={{ x: 0, opacity: 1, rotateY: 0 }}
              transition={{ delay: 0.3, duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.h3
                className="text-2xl lg:text-3xl font-bold mb-6 flex items-center gap-3 text-white"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <motion.div
                  className="p-2 lg:p-3 bg-white/20 rounded-xl backdrop-blur-sm relative overflow-hidden"
                  whileHover={{
                    rotate: 360,
                    scale: 1.2,
                    boxShadow: "0 0 30px rgba(255,255,255,0.5)",
                  }}
                  transition={{ duration: 0.8, type: "spring" }}
                  animate={glowAnimation}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <Globe className="h-6 w-6 lg:h-8 lg:w-8 relative z-10" />
                </motion.div>
                <motion.span
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(255,255,255,0.3)",
                      "0 0 20px rgba(255,255,255,0.6)",
                      "0 0 10px rgba(255,255,255,0.3)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  Frontend
                </motion.span>
              </motion.h3>

              <div className="space-y-4 lg:space-y-6">
                {[
                  { name: "React & Next.js", level: 90, color: "from-blue-400 to-blue-600", icon: "⚛️" },
                  { name: "TypeScript", level: 85, color: "from-blue-500 to-blue-700", icon: "📘" },
                  { name: "Tailwind CSS", level: 95, color: "from-cyan-400 to-cyan-600", icon: "🎨" },
                  { name: "Framer Motion", level: 80, color: "from-purple-400 to-purple-600", icon: "✨" },
                ].map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ x: -100, opacity: 0, scale: 0.8 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.7 + index * 0.2,
                      duration: 1,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="space-y-2 relative"
                    whileHover={{
                      scale: 1.02,
                      x: 10,
                      transition: { type: "spring", stiffness: 400 },
                    }}
                  >
                    <motion.div
                      className={`absolute -inset-2 bg-gradient-to-r ${skill.color} rounded-xl opacity-0 blur-lg`}
                      whileHover={{ opacity: 0.3 }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="flex justify-between items-center relative z-10">
                      <motion.span
                        className="font-semibold text-white text-sm lg:text-lg flex items-center gap-2 lg:gap-3"
                        whileHover={{
                          x: 15,
                          textShadow: "0 0 10px rgba(255,255,255,0.8)",
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <motion.span
                          className="text-lg lg:text-2xl"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                        >
                          {skill.icon}
                        </motion.span>
                        <span className="truncate">{skill.name}</span>
                      </motion.span>
                      <motion.span
                        className="text-white/90 font-bold text-sm lg:text-lg"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 1 + index * 0.2, type: "spring", stiffness: 300 }}
                        animate={{
                          textShadow: [
                            "0 0 5px rgba(255,255,255,0.5)",
                            "0 0 15px rgba(255,255,255,0.8)",
                            "0 0 5px rgba(255,255,255,0.5)",
                          ],
                        }}
                      >
                        {skill.level}%
                      </motion.span>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-white/20 rounded-full h-3 lg:h-4 backdrop-blur-sm overflow-hidden">
                        <motion.div
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: `${skill.level}%`, opacity: 1 }}
                          transition={{
                            delay: 1.2 + index * 0.2,
                            duration: 2,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                          className={`h-3 lg:h-4 rounded-full bg-gradient-to-r ${skill.color} relative overflow-hidden`}
                        >
                          <motion.div
                            className="absolute inset-0 bg-white/40"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: 2 + index * 0.3,
                            }}
                          />
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                            animate={{ x: ["-200%", "200%"] }}
                            transition={{
                              duration: 3,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: 2.5 + index * 0.4,
                            }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 200, opacity: 0, rotateY: 45 }}
              animate={{ x: 0, opacity: 1, rotateY: 0 }}
              transition={{ delay: 0.5, duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.h3
                className="text-2xl lg:text-3xl font-bold mb-6 flex items-center gap-3 text-white"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 1 }}
              >
                <motion.div
                  className="p-2 lg:p-3 bg-white/20 rounded-xl backdrop-blur-sm relative overflow-hidden"
                  whileHover={{
                    rotate: -360,
                    scale: 1.2,
                    boxShadow: "0 0 30px rgba(255,255,255,0.5)",
                  }}
                  transition={{ duration: 0.8, type: "spring" }}
                  animate={glowAnimation}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                  />
                  <Server className="h-6 w-6 lg:h-8 lg:w-8 relative z-10" />
                </motion.div>
                <motion.span
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(255,255,255,0.3)",
                      "0 0 20px rgba(255,255,255,0.6)",
                      "0 0 10px rgba(255,255,255,0.3)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                >
                  Backend
                </motion.span>
              </motion.h3>

              <div className="space-y-4 lg:space-y-6">
                {[
                  { name: "Java & Spring Boot", level: 90, color: "from-orange-400 to-orange-600", icon: "☕" },
                  { name: "Node.js", level: 75, color: "from-green-400 to-green-600", icon: "🟢" },
                  { name: "PostgreSQL", level: 85, color: "from-blue-600 to-blue-800", icon: "🐘" },
                  { name: "MongoDB", level: 70, color: "from-green-600 to-green-800", icon: "🍃" },
                ].map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ x: 100, opacity: 0, scale: 0.8 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.9 + index * 0.2,
                      duration: 1,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="space-y-2 relative"
                    whileHover={{
                      scale: 1.02,
                      x: -10,
                      transition: { type: "spring", stiffness: 400 },
                    }}
                  >
                    <motion.div
                      className={`absolute -inset-2 bg-gradient-to-r ${skill.color} rounded-xl opacity-0 blur-lg`}
                      whileHover={{ opacity: 0.3 }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="flex justify-between items-center relative z-10">
                      <motion.span
                        className="font-semibold text-white text-sm lg:text-lg flex items-center gap-2 lg:gap-3"
                        whileHover={{
                          x: -15,
                          textShadow: "0 0 10px rgba(255,255,255,0.8)",
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <motion.span
                          className="text-lg lg:text-2xl"
                          animate={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                        >
                          {skill.icon}
                        </motion.span>
                        <span className="truncate">{skill.name}</span>
                      </motion.span>
                      <motion.span
                        className="text-white/90 font-bold text-sm lg:text-lg"
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 1.2 + index * 0.2, type: "spring", stiffness: 300 }}
                        animate={{
                          textShadow: [
                            "0 0 5px rgba(255,255,255,0.5)",
                            "0 0 15px rgba(255,255,255,0.8)",
                            "0 0 5px rgba(255,255,255,0.5)",
                          ],
                        }}
                      >
                        {skill.level}%
                      </motion.span>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-white/20 rounded-full h-3 lg:h-4 backdrop-blur-sm overflow-hidden">
                        <motion.div
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: `${skill.level}%`, opacity: 1 }}
                          transition={{
                            delay: 1.4 + index * 0.2,
                            duration: 2,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                          className={`h-3 lg:h-4 rounded-full bg-gradient-to-r ${skill.color} relative overflow-hidden`}
                        >
                          <motion.div
                            className="absolute inset-0 bg-white/40"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: 2.5 + index * 0.3,
                            }}
                          />
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                            animate={{ x: ["-200%", "200%"] }}
                            transition={{
                              duration: 3,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: 3 + index * 0.4,
                            }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      ),
      duration: 15,
    },
    {
      id: "projects",
      title: "Projetos em Destaque",
      subtitle: "Soluções Reais para Problemas Reais",
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      textColor: "text-white",
      animation: "zoom-in",
      transitionType: "wave",
      content: (
        <div className="w-full max-w-7xl mx-auto px-4 relative">
          {/* Floating Elements */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
              }}
            />
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="space-y-8 relative z-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {[
                {
                  title: "Safe Finance",
                  subtitle: "Sistema de Gestão Financeira",
                  description: "Sistema completo para controle financeiro pessoal desenvolvido com Java e Spring Boot",
                  icon: Database,
                  color: "from-orange-500 to-red-500",
                  bgColor: "from-orange-500/20 to-red-500/20",
                  techs: ["Java", "Spring Boot", "PostgreSQL"],
                  stats: [
                    { value: "70%", label: "Redução de Tempo" },
                    { value: "R$ 500", label: "Economia/Mês" },
                  ],
                  delay: 0.3,
                },
                {
                  title: "Portfolio Website",
                  subtitle: "Site Pessoal Moderno",
                  description: "Site moderno com Next.js, animações avançadas e Easter Eggs interativos",
                  icon: Globe,
                  color: "from-purple-500 to-pink-500",
                  bgColor: "from-purple-500/20 to-pink-500/20",
                  techs: ["Next.js", "TypeScript", "Framer Motion"],
                  stats: [
                    { value: "98/100", label: "Lighthouse Score" },
                    { value: "1.2s", label: "Carregamento" },
                  ],
                  delay: 0.5,
                },
              ].map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ y: 150, opacity: 0, rotateX: 45, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0, scale: 1 }}
                  transition={{
                    delay: project.delay,
                    duration: 1.5,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{
                    y: -20,
                    rotateY: index === 0 ? 5 : -5,
                    scale: 1.02,
                    transition: { duration: 0.4, type: "spring", stiffness: 300 },
                  }}
                  className="relative group"
                >
                  <motion.div
                    className={`absolute -inset-4 bg-gradient-to-br ${project.color} rounded-3xl opacity-0 blur-2xl group-hover:opacity-30`}
                    transition={{ duration: 0.5 }}
                  />

                  <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white h-full overflow-hidden relative">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${project.bgColor}`}
                      initial={{ scale: 0, rotate: 45, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      transition={{ delay: project.delay + 0.2, duration: 1 }}
                    />

                    {/* Animated Background Pattern */}
                    <motion.div
                      className="absolute inset-0 opacity-10"
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                      }}
                      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      style={{
                        backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />

                    <CardContent className="p-6 lg:p-8 relative z-10">
                      <motion.div
                        className="flex items-center gap-3 lg:gap-4 mb-4 lg:mb-6"
                        initial={{ x: index === 0 ? -50 : 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: project.delay + 0.4, duration: 1 }}
                      >
                        <motion.div
                          className={`p-2 lg:p-3 bg-gradient-to-r ${project.color} rounded-xl lg:rounded-2xl shadow-lg relative overflow-hidden`}
                          animate={{
                            ...floatingAnimation,
                            boxShadow: [
                              "0 10px 30px rgba(0,0,0,0.3)",
                              "0 20px 40px rgba(0,0,0,0.4)",
                              "0 10px 30px rgba(0,0,0,0.3)",
                            ],
                          }}
                          whileHover={{
                            scale: 1.2,
                            rotate: 360,
                            transition: { duration: 0.6 },
                          }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-white/30"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                          />
                          <project.icon className="h-6 w-6 lg:h-8 lg:w-8 text-white relative z-10" />
                        </motion.div>
                        <div>
                          <motion.h3
                            className="text-lg lg:text-2xl font-bold"
                            initial={{ y: -30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: project.delay + 0.6, duration: 0.8 }}
                            animate={{
                              textShadow: [
                                "0 0 10px rgba(255,255,255,0.3)",
                                "0 0 20px rgba(255,255,255,0.6)",
                                "0 0 10px rgba(255,255,255,0.3)",
                              ],
                            }}
                          >
                            {project.title}
                          </motion.h3>
                          <motion.p
                            className="text-white/80 text-sm lg:text-base"
                            initial={{ y: -30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: project.delay + 0.7, duration: 0.8 }}
                          >
                            {project.subtitle}
                          </motion.p>
                        </div>
                      </motion.div>

                      <motion.p
                        className="text-white/90 mb-4 lg:mb-6 text-sm lg:text-lg leading-relaxed"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: project.delay + 0.8, duration: 1 }}
                      >
                        {project.description}
                      </motion.p>

                      <div className="space-y-4 lg:space-y-6">
                        <motion.div
                          className="flex flex-wrap gap-2 lg:gap-3"
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: project.delay + 1, duration: 1 }}
                        >
                          {project.techs.map((tech, techIndex) => (
                            <motion.div
                              key={tech}
                              initial={{ scale: 0, rotate: index === 0 ? -90 : 90 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{
                                delay: project.delay + 1.2 + techIndex * 0.1,
                                type: "spring",
                                stiffness: 300,
                              }}
                              whileHover={{
                                scale: 1.2,
                                rotate: index === 0 ? 5 : -5,
                                y: -5,
                                boxShadow: "0 5px 15px rgba(255,255,255,0.3)",
                              }}
                            >
                              <Badge className="bg-white/20 text-white border-white/30 px-3 py-1 lg:px-4 lg:py-2 text-xs lg:text-sm backdrop-blur-sm font-semibold">
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </motion.div>

                        <motion.div
                          className="grid grid-cols-2 gap-4 lg:gap-6"
                          initial={{ y: 50, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: project.delay + 1.4, duration: 1 }}
                        >
                          {project.stats.map((stat, statIndex) => (
                            <motion.div
                              key={stat.label}
                              className="text-center relative"
                              whileHover={{
                                scale: 1.1,
                                y: -5,
                                transition: { type: "spring", stiffness: 400 },
                              }}
                            >
                              <motion.div
                                className="absolute inset-0 bg-white/10 rounded-xl blur-lg"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  delay: statIndex * 0.5,
                                }}
                              />
                              <motion.div
                                className="text-xl lg:text-3xl font-bold text-green-300 mb-1 lg:mb-2 relative z-10"
                                animate={{
                                  scale: [1, 1.1, 1],
                                  textShadow: [
                                    "0 0 10px rgba(34, 197, 94, 0.5)",
                                    "0 0 20px rgba(34, 197, 94, 0.8)",
                                    "0 0 10px rgba(34, 197, 94, 0.5)",
                                  ],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  delay: project.delay + 1.6 + statIndex * 0.5,
                                }}
                              >
                                {stat.value}
                              </motion.div>
                              <div className="text-white/80 text-xs lg:text-sm relative z-10">{stat.label}</div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ y: 100, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 1.5, type: "spring" }}
              className="text-center"
            >
              <motion.div
                className="flex items-center justify-center gap-3 text-white/90 text-lg lg:text-xl"
                animate={{
                  y: [0, -10, 0],
                  textShadow: [
                    "0 0 10px rgba(255,255,255,0.3)",
                    "0 0 20px rgba(255,255,255,0.6)",
                    "0 0 10px rgba(255,255,255,0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                whileHover={{
                  scale: 1.05,
                  textShadow: "0 0 30px rgba(255,255,255,0.8)",
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <TrendingUp className="h-5 w-5 lg:h-6 lg:w-6" />
                </motion.div>
                <span className="font-medium">Foco em impacto real e qualidade técnica</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      ),
      duration: 18,
    },
    {
      id: "experience",
      title: "Experiência Profissional",
      subtitle: "Trajetória de Crescimento Contínuo",
      background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      textColor: "text-gray-800",
      animation: "slide-up",
      transitionType: "flip",
      content: (
        <div className="w-full max-w-6xl mx-auto px-4 relative">
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 opacity-5"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            style={{
              backgroundImage:
                "linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%)",
              backgroundSize: "20px 20px",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="space-y-8 lg:space-y-12 relative z-10"
          >
            <div className="relative">
              <motion.div
                className="absolute left-8 lg:left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "100%", opacity: 1 }}
                transition={{ delay: 0.5, duration: 3, ease: [0.25, 0.46, 0.45, 0.94] }}
              />

              {/* Animated dots along timeline */}
              {[0, 1].map((index) => (
                <motion.div
                  key={index}
                  className="absolute left-6 lg:left-10 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg"
                  style={{ top: `${index * 50 + 10}%` }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1 + index * 0.5, type: "spring", stiffness: 300 }}
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(59, 130, 246, 0.4)",
                      "0 0 0 20px rgba(59, 130, 246, 0)",
                      "0 0 0 0 rgba(59, 130, 246, 0)",
                    ],
                  }}
                />
              ))}

              <div className="space-y-8 lg:space-y-12">
                {[
                  {
                    title: "Auxiliar Comercial",
                    company: "CCBEU Sorocaba",
                    period: "Fev 2025 - Presente",
                    status: "Atual",
                    statusColor: "bg-green-100 text-green-800",
                    icon: Briefcase,
                    iconColor: "from-green-500 to-blue-500",
                    tasks: [
                      "Gestão de leads no Bitrix CRM",
                      "Atendimento digital e suporte",
                      "Melhorias no sistema DKSoft",
                    ],
                    delay: 0.3,
                  },
                  {
                    title: "Aprendiz Administrativo",
                    company: "ASSA ABLOY",
                    period: "Jun - Dez 2024",
                    status: "Concluído",
                    statusColor: "bg-blue-100 text-blue-800",
                    icon: Award,
                    iconColor: "from-blue-500 to-purple-500",
                    tasks: [
                      { text: "Reconhecimento por conscientização em SSMA", icon: Star, color: "text-yellow-500" },
                      { text: "Gestão de EPIs e segurança", icon: CheckCircle, color: "text-green-500" },
                      { text: "Suporte administrativo", icon: CheckCircle, color: "text-green-500" },
                    ],
                    delay: 0.5,
                  },
                ].map((job, index) => (
                  <motion.div
                    key={job.title}
                    initial={{ x: -200, opacity: 0, rotateY: -45, scale: 0.8 }}
                    animate={{ x: 0, opacity: 1, rotateY: 0, scale: 1 }}
                    transition={{
                      delay: job.delay,
                      duration: 1.5,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="flex items-start gap-4 lg:gap-8"
                    whileHover={{
                      x: 10,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                  >
                    <div className="relative flex-shrink-0">
                      <motion.div
                        className={`w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r ${job.iconColor} rounded-full flex items-center justify-center shadow-2xl border-4 border-white/50 relative overflow-hidden`}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: job.delay + 0.2, type: "spring", stiffness: 200 }}
                        whileHover={{
                          scale: 1.2,
                          rotate: index === 0 ? 5 : -5,
                          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                        }}
                        animate={{
                          boxShadow: [
                            "0 10px 30px rgba(0,0,0,0.2)",
                            "0 20px 40px rgba(0,0,0,0.3)",
                            "0 10px 30px rgba(0,0,0,0.2)",
                          ],
                        }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                        <job.icon className="h-6 w-6 lg:h-8 lg:w-8 text-white relative z-10" />
                      </motion.div>
                      <motion.div
                        className="absolute -top-1 -right-1 w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: job.delay + 0.4, type: "spring" }}
                        animate={pulseAnimation}
                      >
                        <span className="text-white text-xs lg:text-sm font-bold">{index + 1}</span>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: job.delay + 0.3, duration: 1 }}
                      className="flex-1 min-w-0"
                    >
                      <Card className="bg-white/90 backdrop-blur-md shadow-2xl border-0 overflow-hidden relative group">
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${job.iconColor} opacity-5`}
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{ delay: job.delay + 0.6, duration: 2 }}
                        />

                        {/* Hover effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100"
                          transition={{ duration: 0.3 }}
                        />

                        <CardContent className="p-4 lg:p-6 relative z-10">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 lg:mb-4 gap-2">
                            <motion.h3
                              className="text-lg lg:text-xl font-bold text-gray-800"
                              initial={{ y: -30, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: job.delay + 0.5, duration: 0.8 }}
                              whileHover={{
                                textShadow: "0 0 10px rgba(0,0,0,0.3)",
                                x: 5,
                              }}
                            >
                              {job.title}
                            </motion.h3>
                            <motion.div
                              initial={{ scale: 0, rotate: -90 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ delay: job.delay + 0.7, type: "spring" }}
                              whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                              <Badge
                                className={`${job.statusColor} px-3 py-1 lg:px-4 lg:py-2 text-xs lg:text-sm font-semibold`}
                              >
                                {job.status}
                              </Badge>
                            </motion.div>
                          </div>

                          <motion.p
                            className="text-gray-600 font-semibold mb-1 lg:mb-2 text-sm lg:text-lg"
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: job.delay + 0.6, duration: 0.8 }}
                            whileHover={{ x: 5, color: "#374151" }}
                          >
                            {job.company}
                          </motion.p>

                          <motion.p
                            className="text-gray-500 mb-3 lg:mb-4 text-xs lg:text-sm"
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: job.delay + 0.7, duration: 0.8 }}
                          >
                            {job.period}
                          </motion.p>

                          <div className="space-y-2 lg:space-y-3">
                            {job.tasks.map((task, taskIndex) => (
                              <motion.div
                                key={typeof task === "string" ? task : task.text}
                                initial={{ x: -50, opacity: 0, scale: 0.8 }}
                                animate={{ x: 0, opacity: 1, scale: 1 }}
                                transition={{
                                  delay: job.delay + 0.9 + taskIndex * 0.2,
                                  type: "spring",
                                  stiffness: 300,
                                }}
                                className="flex items-center gap-2 lg:gap-3 group/task"
                                whileHover={{
                                  x: 10,
                                  transition: { type: "spring", stiffness: 400 },
                                }}
                              >
                                <motion.div
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  transition={{
                                    delay: job.delay + 1.1 + taskIndex * 0.2,
                                    type: "spring",
                                    stiffness: 400,
                                  }}
                                  whileHover={{
                                    scale: 1.3,
                                    rotate: 360,
                                    transition: { duration: 0.3 },
                                  }}
                                >
                                  {typeof task === "string" ? (
                                    <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-green-500 flex-shrink-0" />
                                  ) : (
                                    <task.icon className={`h-4 w-4 lg:h-5 lg:w-5 ${task.color} flex-shrink-0`} />
                                  )}
                                </motion.div>
                                <motion.span
                                  className="text-gray-700 text-xs lg:text-sm group-hover/task:text-gray-900"
                                  whileHover={{ fontWeight: 600 }}
                                >
                                  {typeof task === "string" ? task : task.text}
                                </motion.span>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ y: 100, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 1.5, type: "spring" }}
              className="text-center"
            >
              <motion.div
                className="flex items-center justify-center gap-3 text-gray-700 text-lg lg:text-xl"
                animate={{
                  y: [0, -10, 0],
                  textShadow: ["0 0 10px rgba(0,0,0,0.1)", "0 0 20px rgba(0,0,0,0.2)", "0 0 10px rgba(0,0,0,0.1)"],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                whileHover={{
                  scale: 1.05,
                  textShadow: "0 0 30px rgba(0,0,0,0.3)",
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <TrendingUp className="h-5 w-5 lg:h-6 lg:w-6" />
                </motion.div>
                <span className="font-semibold">Crescimento contínuo e aprendizado prático</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      ),
      duration: 15,
    },
    {
      id: "education",
      title: "Formação & Certificações",
      subtitle: "Aprendizado Contínuo e Especialização",
      background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      textColor: "text-gray-800",
      animation: "fade-in",
      transitionType: "dissolve",
      content: (
        <div className="w-full max-w-7xl mx-auto px-4 relative">
          {/* Floating Academic Elements */}
          {[BookOpen, Award, Star].map((Icon, index) => (
            <motion.div
              key={index}
              className="absolute text-gray-400/30"
              style={{
                left: `${20 + index * 30}%`,
                top: `${10 + index * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 180, 360],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 2,
              }}
            >
              <Icon className="w-8 h-8 lg:w-12 lg:h-12" />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative z-10"
          >
            <motion.div
              initial={{ x: -200, opacity: 0, rotateY: -30 }}
              animate={{ x: 0, opacity: 1, rotateY: 0 }}
              transition={{ delay: 0.3, duration: 1.5 }}
            >
              <motion.h3
                className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 flex items-center gap-3 lg:gap-4 text-gray-800"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <motion.div
                  className="p-3 lg:p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl lg:rounded-2xl shadow-lg relative overflow-hidden"
                  animate={{
                    ...floatingAnimation,
                    boxShadow: [
                      "0 10px 30px rgba(59, 130, 246, 0.3)",
                      "0 20px 40px rgba(59, 130, 246, 0.4)",
                      "0 10px 30px rgba(59, 130, 246, 0.3)",
                    ],
                  }}
                  whileHover={{
                    rotate: 360,
                    scale: 1.2,
                    boxShadow: "0 25px 50px rgba(59, 130, 246, 0.5)",
                  }}
                  transition={{ duration: 0.8, type: "spring" }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/30"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <BookOpen className="h-6 w-6 lg:h-8 lg:w-8 text-white relative z-10" />
                </motion.div>
                <motion.span
                  animate={{
                    textShadow: ["0 0 10px rgba(0,0,0,0.1)", "0 0 20px rgba(0,0,0,0.2)", "0 0 10px rgba(0,0,0,0.1)"],
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                >
                  Educação
                </motion.span>
              </motion.h3>

              <motion.div
                initial={{ y: 100, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 1.5, type: "spring" }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                className="relative group"
              >
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl"
                  transition={{ duration: 0.5 }}
                />

                <Card className="bg-white/90 backdrop-blur-md shadow-2xl border-0 overflow-hidden relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"
                    initial={{ scale: 0, rotate: 45, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 1.5 }}
                  />

                  <CardContent className="p-6 lg:p-8 relative z-10">
                    <motion.div
                      className="flex items-center gap-4 lg:gap-6 mb-4 lg:mb-6"
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1, duration: 1 }}
                    >
                      <motion.div
                        className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden"
                        animate={{
                          ...pulseAnimation,
                          boxShadow: [
                            "0 5px 15px rgba(59, 130, 246, 0.2)",
                            "0 10px 25px rgba(59, 130, 246, 0.3)",
                            "0 5px 15px rgba(59, 130, 246, 0.2)",
                          ],
                        }}
                        whileHover={{
                          scale: 1.1,
                          rotate: 5,
                        }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                        <Award className="h-6 w-6 lg:h-8 lg:w-8 text-blue-600 relative z-10" />
                      </motion.div>
                      <div className="min-w-0 flex-1">
                        <motion.h4
                          className="text-lg lg:text-xl font-bold text-gray-800"
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 1.1, duration: 0.8 }}
                          whileHover={{
                            textShadow: "0 0 10px rgba(0,0,0,0.2)",
                            x: 5,
                          }}
                        >
                          Análise e Desenvolvimento de Sistemas
                        </motion.h4>
                        <motion.p
                          className="text-gray-600 font-medium text-sm lg:text-base"
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 1.2, duration: 0.8 }}
                        >
                          Centro Universitário Facens
                        </motion.p>
                      </div>
                    </motion.div>

                    <div className="space-y-3 lg:space-y-4">
                      {[
                        { label: "Período:", value: "2025 - 2027" },
                        { label: "Status:", value: "Em Andamento", badge: true },
                      ].map((item, index) => (
                        <motion.div
                          key={item.label}
                          className="flex items-center justify-between p-3 lg:p-4 bg-gray-50 rounded-xl relative overflow-hidden group/item"
                          initial={{ x: -30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 1.3 + index * 0.1, duration: 0.8 }}
                          whileHover={{
                            x: 5,
                            backgroundColor: "#f8fafc",
                          }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover/item:opacity-100"
                            transition={{ duration: 0.3 }}
                          />
                          <span className="text-gray-600 font-medium text-sm lg:text-base relative z-10">
                            {item.label}
                          </span>
                          {item.badge ? (
                            <motion.div
                              initial={{ scale: 0, rotate: -90 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ delay: 1.6, type: "spring", stiffness: 300 }}
                              whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                              <Badge className="bg-green-100 text-green-800 px-3 py-1 lg:px-4 lg:py-2 text-xs lg:text-sm font-semibold relative z-10">
                                {item.value}
                              </Badge>
                            </motion.div>
                          ) : (
                            <span className="font-bold text-gray-800 text-sm lg:text-base relative z-10">
                              {item.value}
                            </span>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ x: 200, opacity: 0, rotateY: 30 }}
              animate={{ x: 0, opacity: 1, rotateY: 0 }}
              transition={{ delay: 0.5, duration: 1.5 }}
            >
              <motion.h3
                className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 flex items-center gap-3 lg:gap-4 text-gray-800"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 1 }}
              >
                <motion.div
                  className="p-3 lg:p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl lg:rounded-2xl shadow-lg relative overflow-hidden"
                  animate={{
                    ...floatingAnimation,
                    boxShadow: [
                      "0 10px 30px rgba(34, 197, 94, 0.3)",
                      "0 20px 40px rgba(34, 197, 94, 0.4)",
                      "0 10px 30px rgba(34, 197, 94, 0.3)",
                    ],
                  }}
                  style={{ animationDelay: "1s" }}
                  whileHover={{
                    rotate: -360,
                    scale: 1.2,
                    boxShadow: "0 25px 50px rgba(34, 197, 94, 0.5)",
                  }}
                  transition={{ duration: 0.8, type: "spring" }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/30"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                  />
                  <Award className="h-6 w-6 lg:h-8 lg:w-8 text-white relative z-10" />
                </motion.div>
                <motion.span
                  animate={{
                    textShadow: ["0 0 10px rgba(0,0,0,0.1)", "0 0 20px rgba(0,0,0,0.2)", "0 0 10px rgba(0,0,0,0.1)"],
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                >
                  Certificações
                </motion.span>
              </motion.h3>

              <div className="space-y-4 lg:space-y-6">
                {[
                  {
                    name: "Excel Profissionalizante",
                    year: "2024",
                    category: "Produtividade",
                    color: "from-green-400 to-green-600",
                    icon: "📊",
                  },
                  {
                    name: "Analista Suporte Técnico",
                    year: "2024",
                    category: "TI",
                    color: "from-blue-400 to-blue-600",
                    icon: "🔧",
                  },
                  {
                    name: "Gestão de Negócios",
                    year: "2022",
                    category: "Gestão",
                    color: "from-purple-400 to-purple-600",
                    icon: "📈",
                  },
                  {
                    name: "Desenvolvimento Web",
                    year: "2023",
                    category: "Programação",
                    color: "from-orange-400 to-orange-600",
                    icon: "💻",
                  },
                ].map((cert, index) => (
                  <motion.div
                    key={cert.name}
                    initial={{ y: 100, opacity: 0, rotateX: 45, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0, scale: 1 }}
                    transition={{
                      delay: 0.9 + index * 0.2,
                      duration: 1.2,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{
                      y: -10,
                      scale: 1.03,
                      transition: { duration: 0.3, type: "spring", stiffness: 400 },
                    }}
                    className="relative group"
                  >
                    <motion.div
                      className={`absolute -inset-2 bg-gradient-to-r ${cert.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-lg`}
                      transition={{ duration: 0.4 }}
                    />

                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden relative">
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${cert.color} opacity-5`}
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ delay: 1.5 + index * 0.3, duration: 1.5 }}
                      />

                      <CardContent className="p-4 lg:p-6 relative z-10">
                        <div className="flex items-center justify-between">
                          <div className="min-w-0 flex-1 flex items-center gap-3">
                            <motion.span
                              className="text-2xl"
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{
                                duration: 3,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: index * 0.5,
                              }}
                            >
                              {cert.icon}
                            </motion.span>
                            <div className="min-w-0">
                              <motion.h4
                                className="font-bold text-gray-800 text-sm lg:text-lg"
                                initial={{ x: -30, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 1.1 + index * 0.2, duration: 0.8 }}
                                whileHover={{
                                  x: 5,
                                  textShadow: "0 0 10px rgba(0,0,0,0.2)",
                                }}
                              >
                                {cert.name}
                              </motion.h4>
                              <motion.p
                                className="text-gray-600 text-xs lg:text-sm"
                                initial={{ x: -30, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 1.2 + index * 0.2, duration: 0.8 }}
                              >
                                {cert.category}
                              </motion.p>
                            </div>
                          </div>
                          <motion.div
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                              delay: 1.3 + index * 0.2,
                              type: "spring",
                              stiffness: 300,
                            }}
                            whileHover={{
                              scale: 1.1,
                              rotate: 5,
                              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                            }}
                          >
                            <Badge
                              variant="outline"
                              className="text-gray-700 border-gray-300 px-2 py-1 lg:px-3 lg:py-1 text-xs lg:text-sm font-semibold"
                            >
                              {cert.year}
                            </Badge>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ y: 100, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 2.5, duration: 1.5, type: "spring" }}
                  className="text-center mt-6 lg:mt-8"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, -2, 0],
                      boxShadow: [
                        "0 10px 30px rgba(168, 85, 247, 0.2)",
                        "0 20px 40px rgba(168, 85, 247, 0.3)",
                        "0 10px 30px rgba(168, 85, 247, 0.2)",
                      ],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 25px 50px rgba(168, 85, 247, 0.4)",
                    }}
                  >
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 lg:px-8 lg:py-3 text-sm lg:text-lg shadow-lg font-semibold">
                      +15 certificações adicionais
                    </Badge>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      ),
      duration: 15,
    },
    {
      id: "contact",
      title: "Vamos Conversar?",
      subtitle: "Aberto a Novas Oportunidades",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      textColor: "text-white",
      animation: "zoom-out",
      transitionType: "origami",
      content: (
        <div className="w-full max-w-6xl mx-auto px-4 relative">
          {/* Animated Background Elements */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.4,
              }}
            />
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="text-center space-y-8 lg:space-y-12 relative z-10"
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1.5 }}
              className="space-y-6 lg:space-y-8"
            >
              <div className="space-y-4 lg:space-y-6">
                <motion.p
                  className="text-xl lg:text-3xl text-white/90 font-light"
                  animate={{
                    opacity: [0.8, 1, 0.8],
                    textShadow: [
                      "0 0 20px rgba(255,255,255,0.3)",
                      "0 0 40px rgba(255,255,255,0.6)",
                      "0 0 20px rgba(255,255,255,0.3)",
                    ],
                  }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                  whileHover={{
                    scale: 1.02,
                    textShadow: "0 0 50px rgba(255,255,255,0.8)",
                  }}
                >
                  Estou disponível para novos desafios e oportunidades
                </motion.p>

                <motion.div
                  className="flex items-center justify-center gap-4 lg:gap-8 text-white/80 text-sm lg:text-lg flex-wrap"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  {[
                    { icon: Code, text: "Desenvolvedor Full Stack" },
                    { icon: MapPin, text: "Sorocaba/SP" },
                    { icon: Globe, text: "Remoto" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.text}
                      className="flex items-center gap-2 lg:gap-3"
                      whileHover={{
                        scale: 1.1,
                        color: "#ffffff",
                        textShadow: "0 0 15px rgba(255,255,255,0.8)",
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        animate={{
                          rotate: [0, 360],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: index * 0.5,
                        }}
                      >
                        <item.icon className="h-4 w-4 lg:h-6 lg:w-6" />
                      </motion.div>
                      <span>{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7, duration: 1.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6"
              >
                {[
                  {
                    icon: Mail,
                    title: "Email",
                    content: "henrique.monteiro.cardoso@outlook.com",
                    color: "from-red-500 to-pink-500",
                    delay: 0,
                  },
                  {
                    icon: Linkedin,
                    title: "LinkedIn",
                    content: "henrique-monteiro-cardoso",
                    color: "from-blue-500 to-blue-700",
                    delay: 0.2,
                  },
                  {
                    icon: Github,
                    title: "GitHub",
                    content: "HenriqueMC17",
                    color: "from-gray-700 to-gray-900",
                    delay: 0.4,
                  },
                ].map((contact, index) => (
                  <motion.div
                    key={contact.title}
                    initial={{ y: 150, opacity: 0, rotateX: 45, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0, scale: 1 }}
                    transition={{
                      delay: 0.9 + contact.delay,
                      duration: 1.2,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{
                      y: -20,
                      rotateY: 5,
                      scale: 1.05,
                      transition: { duration: 0.4, type: "spring", stiffness: 300 },
                    }}
                    className="relative group"
                  >
                    <motion.div
                      className={`absolute -inset-4 bg-gradient-to-br ${contact.color} rounded-3xl opacity-0 group-hover:opacity-30 blur-2xl`}
                      transition={{ duration: 0.5 }}
                    />

                    <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-500 overflow-hidden group h-full relative">
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${contact.color} opacity-0 group-hover:opacity-20`}
                        initial={{ scale: 0, rotate: 45 }}
                        whileHover={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5 }}
                      />

                      {/* Animated Background Pattern */}
                      <motion.div
                        className="absolute inset-0 opacity-5"
                        animate={{
                          backgroundPosition: ["0% 0%", "100% 100%"],
                        }}
                        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        style={{
                          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                          backgroundSize: "15px 15px",
                        }}
                      />

                      <CardContent className="p-4 lg:p-6 text-center relative z-10">
                        <motion.div
                          className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4 shadow-lg relative overflow-hidden"
                          animate={{
                            ...floatingAnimation,
                            boxShadow: [
                              "0 10px 30px rgba(255,255,255,0.2)",
                              "0 20px 40px rgba(255,255,255,0.3)",
                              "0 10px 30px rgba(255,255,255,0.2)",
                            ],
                          }}
                          style={{ animationDelay: `${index * 0.5}s` }}
                          whileHover={{
                            scale: 1.3,
                            rotate: 360,
                            boxShadow: "0 25px 50px rgba(255,255,255,0.4)",
                          }}
                          transition={{ duration: 0.6 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-white/30"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          />
                          <contact.icon className="h-6 w-6 lg:h-8 lg:w-8 text-white relative z-10" />
                        </motion.div>
                        <motion.h3
                          className="font-bold text-white mb-2 lg:mb-3 text-sm lg:text-xl"
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 1.2 + contact.delay, duration: 0.8 }}
                          whileHover={{
                            textShadow: "0 0 15px rgba(255,255,255,0.8)",
                            y: -2,
                          }}
                        >
                          {contact.title}
                        </motion.h3>
                        <motion.p
                          className="text-white/80 text-xs lg:text-sm break-all"
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 1.3 + contact.delay, duration: 0.8 }}
                          whileHover={{ color: "#ffffff" }}
                        >
                          {contact.content}
                        </motion.p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 1.5 }}
              className="space-y-6 lg:space-y-8"
            >
              <motion.div
                className="flex items-center justify-center gap-6 lg:gap-8 flex-wrap"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.7, duration: 1 }}
              >
                {[
                  { icon: Heart, text: "Paixão por", subtitle: "Tecnologia & Inovação", color: "text-red-400" },
                  { icon: Target, text: "Foco em", subtitle: "Qualidade & Impacto", color: "text-green-400" },
                  { icon: Zap, text: "Sempre", subtitle: "Aprendendo", color: "text-yellow-400" },
                ].map((item, index) => (
                  <motion.div
                    key={item.text}
                    initial={{ y: 50, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{
                      delay: 1.9 + index * 0.2,
                      duration: 1,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="text-center relative"
                    whileHover={{
                      scale: 1.1,
                      y: -10,
                      transition: { type: "spring", stiffness: 400 },
                    }}
                  >
                    <motion.div
                      className={`absolute -inset-4 ${item.color.replace("text-", "bg-").replace("-400", "-500/20")} rounded-2xl opacity-0 blur-xl`}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="flex items-center justify-center gap-2 lg:gap-3 text-white mb-2 lg:mb-3 relative z-10"
                      whileHover={{
                        textShadow: "0 0 20px rgba(255,255,255,0.8)",
                      }}
                    >
                      <motion.div
                        animate={{
                          ...pulseAnimation,
                          rotate: [0, 10, -10, 0],
                        }}
                        style={{ animationDelay: `${index * 0.5}s` }}
                      >
                        <item.icon className={`h-5 w-5 lg:h-6 lg:w-6 ${item.color}`} />
                      </motion.div>
                      <span className="font-semibold text-sm lg:text-lg">{item.text}</span>
                    </motion.div>
                    <p className="text-white/80 text-xs lg:text-base relative z-10">{item.subtitle}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2.5, duration: 1.5 }}
                className="space-y-4 lg:space-y-6"
              >
                <motion.div
                  className="text-2xl lg:text-3xl font-bold text-white flex items-center justify-center gap-2 lg:gap-3"
                  animate={{
                    y: [0, -10, 0],
                    textShadow: [
                      "0 0 20px rgba(255,255,255,0.5)",
                      "0 0 40px rgba(255,255,255,0.8)",
                      "0 0 20px rgba(255,255,255,0.5)",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                  whileHover={{
                    scale: 1.05,
                    textShadow: "0 0 50px rgba(255,255,255,1)",
                  }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    whileHover={{
                      scale: 1.2,
                      filter: "drop-shadow(0 0 10px #fbbf24)",
                    }}
                  >
                    <Coffee className="h-6 w-6 lg:h-8 lg:w-8 text-yellow-400" />
                  </motion.div>
                  Obrigado pela atenção!
                </motion.div>

                <motion.p
                  className="text-white/90 text-lg lg:text-xl"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 2.7, duration: 1 }}
                  whileHover={{
                    scale: 1.02,
                    textShadow: "0 0 15px rgba(255,255,255,0.6)",
                  }}
                >
                  Espero que possamos trabalhar juntos em breve
                </motion.p>

                <motion.div
                  className="flex items-center justify-center gap-2 lg:gap-3 text-white/70 text-sm lg:text-lg"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    x: [0, 15, 0],
                    textShadow: [
                      "0 0 10px rgba(255,255,255,0.3)",
                      "0 0 20px rgba(255,255,255,0.6)",
                      "0 0 10px rgba(255,255,255,0.3)",
                    ],
                  }}
                  transition={{
                    y: { delay: 2.9, duration: 1 },
                    opacity: { delay: 2.9, duration: 1 },
                    x: { duration: 3, repeat: Number.POSITIVE_INFINITY },
                    textShadow: { duration: 4, repeat: Number.POSITIVE_INFINITY },
                  }}
                  whileHover={{
                    scale: 1.05,
                    color: "#ffffff",
                    textShadow: "0 0 25px rgba(255,255,255,0.8)",
                  }}
                >
                  <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
                    <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5" />
                  </motion.div>
                  <span>Vamos construir algo incrível juntos!</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      ),
      duration: 20,
    },
  ]

  const currentSlideData = presentationSlides[currentSlide]
  const currentTransitionType = randomTransitions
    ? getRandomTransition()
    : currentSlideData.transitionType || currentTransition
  const slideVariants = transitionVariants[currentTransitionType]
  const transitionTiming = transitionTimings[currentTransitionType]

  const handleMouseMove = (event: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = event.clientX - rect.left - rect.width / 2
      const y = event.clientY - rect.top - rect.height / 2
      mouseX.set(x)
      mouseY.set(y)
      setMousePosition({ x: event.clientX, y: event.clientY })
    }
  }

  // Touch gesture handlers
  const handlePanStart = () => {
    setIsDragging(true)
    playSound("swipe", 0.2)
    if (presentationAnalytics) {
      presentationAnalytics.trackGesture("swipe_start", currentSlide)
    }
  }

  const handlePan = (event: any, info: PanInfo) => {
    const progress = Math.abs(info.offset.x) / 200
    setDragProgress(Math.min(progress, 1))
  }

  const handlePanEnd = (event: any, info: PanInfo) => {
    setIsDragging(false)
    setDragProgress(0)

    const threshold = 100
    const velocity = Math.abs(info.velocity.x)

    if (Math.abs(info.offset.x) > threshold || velocity > 500) {
      if (info.offset.x > 0) {
        // Swipe right - previous slide
        if (currentSlide > 0) {
          playSound("slideChange")
          prevSlide()
          if (presentationAnalytics) {
            presentationAnalytics.trackGesture("swipe_right", currentSlide)
          }
        } else {
          playSound("pop", 0.1)
        }
      } else {
        // Swipe left - next slide
        if (currentSlide < presentationSlides.length - 1) {
          playSound("slideChange")
          nextSlide()
          if (presentationAnalytics) {
            presentationAnalytics.trackGesture("swipe_left", currentSlide)
          }
        } else {
          playSound("pop", 0.1)
        }
      }
    }
  }

  // Keyboard shortcuts with easter eggs
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return

      // Add to key sequence for easter eggs
      setKeySequence((prev) => {
        const newSequence = [...prev, event.code].slice(-10) // Keep last 10 keys

        // Check for Konami code
        const konamiCode = [
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
        if (newSequence.length >= konamiCode.length) {
          const lastKeys = newSequence.slice(-konamiCode.length)
          if (lastKeys.every((key, i) => key === konamiCode[i])) {
            activateEasterEgg("konami_presentation")
            return []
          }
        }

        // Check for TIME sequence
        const timeKeys = ["KeyT", "KeyI", "KeyM", "KeyE"]
        if (newSequence.length >= timeKeys.length) {
          const lastKeys = newSequence.slice(-timeKeys.length)
          if (lastKeys.every((key, i) => key === timeKeys[i])) {
            activateEasterEgg("time_travel")
            return []
          }
        }

        // Check for RAINBOW sequence
        const rainbowKeys = ["KeyR", "KeyA", "KeyI", "KeyN", "KeyB", "KeyO", "KeyW"]
        if (newSequence.length >= rainbowKeys.length) {
          const lastKeys = newSequence.slice(-rainbowKeys.length)
          if (lastKeys.every((key, i) => key === rainbowKeys[i])) {
            activateEasterEgg("rainbow_mode")
            return []
          }
        }

        return newSequence
      })

      // Add to typed sequence for word-based easter eggs
      if (event.key.length === 1) {
        setTypedSequence((prev) => {
          const newSequence = (prev + event.key.toLowerCase()).slice(-10)

          if (newSequence.includes("shuffle")) {
            activateEasterEgg("slide_shuffle", {
              shuffleSlides: () => {
                // Shuffle slides logic here
                const randomSlide = Math.floor(Math.random() * presentationSlides.length)
                goToSlide(randomSlide)
              },
            })
            return ""
          }

          if (newSequence.includes("matrix")) {
            activateEasterEgg("matrix_rain")
            return ""
          }

          return newSequence
        })
      }

      switch (event.key) {
        case "ArrowLeft":
        case "ArrowUp":
          event.preventDefault()
          playSound("buttonClick", 0.1)
          prevSlide()
          break
        case "ArrowRight":
        case "ArrowDown":
        case " ":
          event.preventDefault()
          playSound("buttonClick", 0.1)
          nextSlide()
          break
        case "Escape":
          event.preventDefault()
          playSound("whoosh")
          setIsOpen(false)
          break
        case "f":
        case "F":
          event.preventDefault()
          playSound("pop")
          toggleFullscreen()
          break
        case "p":
        case "P":
          event.preventDefault()
          playSound("buttonClick")
          togglePlay()
          break
        case "m":
        case "M":
          event.preventDefault()
          playSound("buttonClick", 0.1)
          setSoundEnabled(!soundEnabled)
          break
        case "h":
        case "H":
          event.preventDefault()
          playSound("hover", 0.1)
          setShowGestureHint(!showGestureHint)
          break
        case "a":
        case "A":
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault()
            setShowAnalytics(!showAnalytics)
          }
          break
        case "e":
        case "E":
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault()
            setShowEasterEggPanel(!showEasterEggPanel)
          }
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentSlide, soundEnabled, showGestureHint, showAnalytics, showEasterEggPanel, activateEasterEgg])

  // Show gesture hint on first open
  useEffect(() => {
    if (isOpen && !showGestureHint) {
      const timer = setTimeout(() => {
        setShowGestureHint(true)
        setTimeout(() => setShowGestureHint(false), 3000)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Analytics tracking
  useEffect(() => {
    if (isOpen && presentationAnalytics) {
      presentationAnalytics.startPresentation(presentationSlides.length)
    }

    return () => {
      if (presentationAnalytics) {
        presentationAnalytics.endPresentation()
      }
    }
  }, [isOpen, presentationAnalytics])

  useEffect(() => {
    if (isOpen && presentationAnalytics) {
      presentationAnalytics.trackSlideView(currentSlide, currentSlideData.title)
    }
  }, [currentSlide, isOpen, presentationAnalytics, currentSlideData.title])

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
        setProgress(((currentSlideData.duration - timeLeft) / currentSlideData.duration) * 100)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (isPlaying && timeLeft === 0) {
      playSound("slideTransition")
      nextSlide()
    }
  }, [isPlaying, timeLeft, currentSlide])

  useEffect(() => {
    if (isPlaying) {
      setTimeLeft(currentSlideData.duration)
      setProgress(0)
    }
  }, [currentSlide, isPlaying])

  useEffect(() => {
    let cursorTimer: NodeJS.Timeout
    if (isOpen && isPlaying) {
      cursorTimer = setTimeout(() => {
        setShowCursor(false)
      }, 4000)
    } else {
      setShowCursor(true)
    }
    return () => clearTimeout(cursorTimer)
  }, [isOpen, isPlaying, mousePosition])

  const nextSlide = useCallback(() => {
    if (currentSlide < presentationSlides.length - 1) {
      setDirection(1)
      setCurrentSlide(currentSlide + 1)
      playSound("slideTransition")
      if (presentationAnalytics) {
        presentationAnalytics.trackSlideSkip(currentSlide, currentSlide + 1, "button")
      }
    } else {
      setIsPlaying(false)
      setDirection(1)
      setCurrentSlide(0)
      playSound("success")
    }
  }, [currentSlide, presentationSlides.length, presentationAnalytics])

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1)
      setCurrentSlide(currentSlide - 1)
      playSound("slideTransition")
      if (presentationAnalytics) {
        presentationAnalytics.trackSlideSkip(currentSlide, currentSlide - 1, "button")
      }
    }
  }, [currentSlide, presentationAnalytics])

  const togglePlay = useCallback(() => {
    setIsPlaying(!isPlaying)
    playSound(isPlaying ? "buttonClick" : "success")
    if (presentationAnalytics) {
      presentationAnalytics.trackPlaybackControl(isPlaying ? "pause" : "resume", currentSlide)
    }
    if (!isPlaying) {
      setTimeLeft(currentSlideData.duration)
      setProgress(0)
    }
  }, [isPlaying, currentSlide, presentationAnalytics])

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentSlide ? 1 : -1)
      setCurrentSlide(index)
      setIsPlaying(false)
      setProgress(0)
      playSound("slideChange")
      if (presentationAnalytics) {
        presentationAnalytics.trackSlideSkip(currentSlide, index, "direct")
      }
    },
    [currentSlide, presentationAnalytics],
  )

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
    playSound("whoosh")
    if (presentationAnalytics) {
      presentationAnalytics.trackFullscreenToggle(!isFullscreen)
    }
  }, [isFullscreen, presentationAnalytics])

  return (
    <>
      {/* Presentation Mode Button */}
      <motion.div
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, duration: 1.5 }}
        className="fixed bottom-20 right-6 z-40"
      >
        <motion.div
          whileHover={{
            scale: 1.15,
            y: -8,
            boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Button
            onClick={() => {
              setIsOpen(true)
              playSound("success")
            }}
            onMouseEnter={() => playSound("hover", 0.05)}
            className="shadow-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white border-0 px-8 py-4 rounded-full transition-all duration-500 hover:shadow-purple-500/25 relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <div className="flex items-center gap-3 relative z-10">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="group-hover:animate-pulse"
              >
                <Presentation className="h-6 w-6" />
              </motion.div>
              <span className="font-semibold text-lg">Modo Apresentação</span>
            </div>
          </Button>
        </motion.div>
      </motion.div>

      {/* Presentation Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 bg-black ${showCursor ? "cursor-auto" : "cursor-none"}`}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            style={{
              perspective: "1000px",
            }}
          >
            {/* Background */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`bg-${currentSlide}`}
                variants={backgroundVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0"
                style={{
                  background: currentSlideData.background,
                }}
              />
            </AnimatePresence>

            {/* Easter Egg Panel */}
            <AnimatePresence>
              {showEasterEggPanel && (
                <motion.div
                  initial={{ opacity: 0, x: -300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-40 w-80 bg-black/80 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Gamepad2 className="h-5 w-5 text-purple-400" />
                      <h3 className="text-white font-semibold">Easter Eggs</h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowEasterEggPanel(false)}
                      className="text-white hover:bg-white/20"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {easterEggs.map((egg) => (
                      <div
                        key={egg.id}
                        className={`p-3 rounded-lg border ${
                          egg.isUnlocked ? "bg-green-500/20 border-green-500/30" : "bg-gray-500/20 border-gray-500/30"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium text-sm">{egg.isUnlocked ? egg.name : "???"}</span>
                          <Badge variant={egg.isActive ? "default" : "outline"} className="text-xs">
                            {egg.isActive ? "Ativo" : egg.isUnlocked ? "Desbloqueado" : "Bloqueado"}
                          </Badge>
                        </div>
                        <p className="text-white/70 text-xs mb-2">
                          {egg.isUnlocked ? egg.description : "Easter egg bloqueado"}
                        </p>
                        {egg.isUnlocked && <div className="text-xs text-white/50 font-mono">{egg.trigger}</div>}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-center">
                    <div className="text-white/70 text-sm">
                      {unlockedEasterEggs.length} / {easterEggs.length} descobertos
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                      <motion.div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        style={{ width: `${(unlockedEasterEggs.length / easterEggs.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Analytics Panel */}
            <AnimatePresence>
              {showAnalytics && presentationAnalytics && (
                <motion.div
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 300 }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-40 w-80 bg-black/80 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-blue-400" />
                      <h3 className="text-white font-semibold">Analytics</h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAnalytics(false)}
                      className="text-white hover:bg-white/20"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {(() => {
                      const insights = presentationAnalytics.getInsights()
                      return (
                        <>
                          <div className="bg-blue-500/20 rounded-lg p-3">
                            <h4 className="text-blue-300 font-medium text-sm mb-2">Engajamento</h4>
                            <div className="space-y-1 text-xs text-white/80">
                              <div>Interações: {insights.engagement.totalInteractions}</div>
                              <div>Tempo médio/slide: {Math.round(insights.engagement.averageSlideTime / 1000)}s</div>
                              <div>Taxa de conclusão: {Math.round(insights.engagement.completionRate * 100)}%</div>
                            </div>
                          </div>

                          <div className="bg-purple-500/20 rounded-lg p-3">
                            <h4 className="text-purple-300 font-medium text-sm mb-2">Descobertas</h4>
                            <div className="space-y-1 text-xs text-white/80">
                              <div>Easter Eggs: {insights.discovery.easterEggsFound}</div>
                              <div>Gestos usados: {insights.discovery.gesturesUsed}</div>
                              <div>Transições exploradas: {insights.discovery.transitionsExplored}</div>
                            </div>
                          </div>

                          <div className="bg-green-500/20 rounded-lg p-3">
                            <h4 className="text-green-300 font-medium text-sm mb-2">Comportamento</h4>
                            <div className="space-y-1 text-xs text-white/80">
                              <div>Dispositivo: {insights.behavior.preferredDevice}</div>
                              <div>Fullscreen: {insights.behavior.usedFullscreen ? "Sim" : "Não"}</div>
                              <div>Som: {insights.behavior.soundEnabled ? "Ligado" : "Desligado"}</div>
                            </div>
                          </div>
                        </>
                      )
                    })()}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Gesture Hint */}
            <AnimatePresence>
              {showGestureHint && (
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.8 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
                >
                  <div className="bg-black/80 backdrop-blur-md rounded-2xl p-6 text-white text-center space-y-4 border border-white/20">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="flex items-center justify-center gap-3"
                    >
                      <Touch className="h-8 w-8 text-blue-400" />
                      <Hand className="h-8 w-8 text-purple-400" />
                      <Trophy className="h-8 w-8 text-yellow-400" />
                    </motion.div>
                    <div className="space-y-2">
                      <p className="text-lg font-semibold">Controles Avançados</p>
                      <div className="text-sm space-y-1 text-white/80">
                        <p>← Deslize para navegar →</p>
                        <p>Duplo clique no título para surpresas</p>
                        <p>Teclas: ←→ ↑↓ Space Esc F P M H</p>
                        <p>Ctrl+A: Analytics | Ctrl+E: Easter Eggs</p>
                        <p>Digite palavras secretas...</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Drag Progress Indicator */}
            <AnimatePresence>
              {isDragging && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-1/2 left-4 right-4 transform -translate-y-1/2 z-30 pointer-events-none"
                >
                  <div className="bg-white/20 backdrop-blur-sm rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-400 to-purple-400"
                      style={{ width: `${dragProgress * 100}%` }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Controls */}
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: showCursor ? 1 : 0.3 }}
              transition={{ duration: 0.5 }}
              className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black/50 backdrop-blur-md rounded-full p-3 border border-white/20"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsOpen(false)
                      playSound("whoosh")
                    }}
                    onMouseEnter={() => playSound("hover", 0.05)}
                    className="text-white hover:bg-white/20 p-2"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </motion.div>

                <div className="bg-black/50 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                  <span className="text-white text-sm font-medium">
                    {currentSlide + 1} / {presentationSlides.length}
                  </span>
                </div>

                {isPlaying && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-black/50 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 flex items-center gap-2"
                  >
                    <Clock className="h-4 w-4 text-white" />
                    <span className="text-white text-sm font-medium">{timeLeft}s</span>
                    <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-white rounded-full"
                        style={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Analytics Toggle */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black/50 backdrop-blur-md rounded-full p-3 border border-white/20"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowAnalytics(!showAnalytics)
                      playSound("buttonClick", 0.1)
                    }}
                    onMouseEnter={() => playSound("hover", 0.05)}
                    className="text-white hover:bg-white/20 p-2"
                  >
                    <BarChart3 className="h-5 w-5" />
                  </Button>
                </motion.div>

                {/* Easter Egg Toggle */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black/50 backdrop-blur-md rounded-full p-3 border border-white/20"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowEasterEggPanel(!showEasterEggPanel)
                      playSound("buttonClick", 0.1)
                    }}
                    onMouseEnter={() => playSound("hover", 0.05)}
                    className="text-white hover:bg-white/20 p-2"
                  >
                    <Gamepad2 className="h-5 w-5" />
                  </Button>
                </motion.div>

                {/* Sound Toggle */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black/50 backdrop-blur-md rounded-full p-3 border border-white/20"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSoundEnabled(!soundEnabled)
                      playSound("buttonClick", 0.1)
                      if (presentationAnalytics) {
                        presentationAnalytics.trackSoundToggle(!soundEnabled)
                      }
                    }}
                    onMouseEnter={() => playSound("hover", 0.05)}
                    className="text-white hover:bg-white/20 p-2"
                  >
                    {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                  </Button>
                </motion.div>

                {/* Transition Menu */}
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-black/50 backdrop-blur-md rounded-full p-3 border border-white/20"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowTransitionMenu(!showTransitionMenu)
                        playSound("buttonClick", 0.1)
                      }}
                      onMouseEnter={() => playSound("hover", 0.05)}
                      className="text-white hover:bg-white/20 p-2"
                    >
                      <Settings className="h-5 w-5" />
                    </Button>
                  </motion.div>

                  <AnimatePresence>
                    {showTransitionMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute top-full right-0 mt-2 bg-black/80 backdrop-blur-md rounded-2xl p-4 border border-white/20 min-w-[300px]"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-white font-medium">Transições</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setRandomTransitions(!randomTransitions)
                                playSound("buttonClick", 0.1)
                                if (presentationAnalytics) {
                                  presentationAnalytics.trackTransitionChange("random", !randomTransitions)
                                }
                              }}
                              className={`text-xs px-3 py-1 ${
                                randomTransitions ? "bg-purple-500/20 text-purple-300" : "bg-white/10 text-white/70"
                              }`}
                            >
                              <Shuffle className="h-3 w-3 mr-1" />
                              Aleatório
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {transitionTypes.map((transition) => (
                              <Button
                                key={transition.type}
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setCurrentTransition(transition.type)
                                  setRandomTransitions(false)
                                  playSound("buttonClick", 0.1)
                                  if (presentationAnalytics) {
                                    presentationAnalytics.trackTransitionChange(transition.type, false)
                                  }
                                }}
                                onMouseEnter={() => playSound("hover", 0.05)}
                                className={`text-xs px-3 py-2 justify-start ${
                                  currentTransition === transition.type && !randomTransitions
                                    ? "bg-blue-500/20 text-blue-300"
                                    : "text-white/70 hover:bg-white/10"
                                }`}
                              >
                                <span className="mr-2">{transition.icon}</span>
                                {transition.name}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Fullscreen Toggle */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black/50 backdrop-blur-md rounded-full p-3 border border-white/20"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleFullscreen}
                    onMouseEnter={() => playSound("hover", 0.05)}
                    className="text-white hover:bg-white/20 p-2"
                  >
                    <Maximize2 className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Slide Content */}
            <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={transitionTiming}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragStart={handlePanStart}
                  onDrag={handlePan}
                  onDragEnd={handlePanEnd}
                  className="w-full h-full flex flex-col items-center justify-center text-center relative"
                  style={{
                    rotateX: rotateX,
                    rotateY: rotateY,
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className={`space-y-6 md:space-y-8 ${currentSlideData.textColor} max-w-full`}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 1.2, type: "spring" }}
                      className="space-y-3 md:space-y-4"
                    >
                      <motion.h1
                        className="text-4xl md:text-6xl lg:text-8xl font-bold leading-tight"
                        animate={{
                          textShadow: [
                            "0 0 20px rgba(255,255,255,0.3)",
                            "0 0 40px rgba(255,255,255,0.6)",
                            "0 0 20px rgba(255,255,255,0.3)",
                          ],
                        }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                        onDoubleClick={handleDoubleClick}
                        ref={(el) => el && handleLongPress(el)}
                      >
                        {currentSlideData.title}
                      </motion.h1>
                      {currentSlideData.subtitle && (
                        <motion.p
                          className="text-xl md:text-2xl lg:text-4xl opacity-90 font-light"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 0.9, y: 0 }}
                          transition={{ delay: 0.8, duration: 1 }}
                          onDoubleClick={handleDoubleClick}
                          ref={(el) => el && handleLongPress(el)}
                        >
                          {currentSlideData.subtitle}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 1.5 }}
                      className="w-full"
                    >
                      {currentSlideData.content}
                    </motion.div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: showCursor ? 1 : 0.3 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-4 left-4 right-4 z-30 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black/50 backdrop-blur-md rounded-full p-3 border border-white/20"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      prevSlide()
                      playSound("buttonClick", 0.1)
                    }}
                    onMouseEnter={() => playSound("hover", 0.05)}
                    disabled={currentSlide === 0}
                    className="text-white hover:bg-white/20 p-2 disabled:opacity-50"
                  >
                    <SkipBack className="h-5 w-5" />
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black/50 backdrop-blur-md rounded-full p-3 border border-white/20"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={togglePlay}
                    onMouseEnter={() => playSound("hover", 0.05)}
                    className="text-white hover:bg-white/20 p-2"
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black/50 backdrop-blur-md rounded-full p-3 border border-white/20"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      nextSlide()
                      playSound("buttonClick", 0.1)
                    }}
                    onMouseEnter={() => playSound("hover", 0.05)}
                    className="text-white hover:bg-white/20 p-2"
                  >
                    <SkipForward className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>

              {/* Slide Indicators */}
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                {presentationSlides.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      goToSlide(index)
                      playSound("buttonClick", 0.1)
                    }}
                    onMouseEnter={() => playSound("hover", 0.05)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "bg-white scale-125" : "bg-white/40 hover:bg-white/60"
                    }`}
                    whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.8 }}
                  />
                ))}
              </div>

              {/* Easter Egg Counter */}
              <div className="bg-black/50 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-400" />
                <span className="text-white text-sm font-medium">
                  {unlockedEasterEggs.length}/{easterEggs.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
