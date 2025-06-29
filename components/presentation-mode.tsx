"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
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
  Sparkles,
  Rocket,
  CloudLightningIcon as Lightning,
} from "lucide-react"

interface PresentationSlide {
  id: string
  title: string
  subtitle?: string
  content: React.ReactNode
  duration: number
  background: string
  textColor?: string
  animation?: string
}

const slideVariants = {
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

  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 30 })
  const rotateX = useTransform(smoothMouseY, [-300, 300], [8, -8])
  const rotateY = useTransform(smoothMouseX, [-300, 300], [-8, 8])

  const presentationSlides: PresentationSlide[] = [
    {
      id: "intro",
      title: "Henrique Monteiro Cardoso",
      subtitle: "Desenvolvedor Full Stack",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      textColor: "text-white",
      animation: "fade-up",
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

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
        setProgress(((currentSlideData.duration - timeLeft) / currentSlideData.duration) * 100)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (isPlaying && timeLeft === 0) {
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
    } else {
      setIsPlaying(false)
      setDirection(1)
      setCurrentSlide(0)
    }
  }, [currentSlide, presentationSlides.length])

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1)
      setCurrentSlide(currentSlide - 1)
    }
  }, [currentSlide])

  const togglePlay = useCallback(() => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      setTimeLeft(currentSlideData.duration)
      setProgress(0)
    }
  }, [isPlaying, currentSlide])

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentSlide ? 1 : -1)
      setCurrentSlide(index)
      setIsPlaying(false)
      setProgress(0)
    },
    [currentSlide],
  )

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

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
            onClick={() => setIsOpen(true)}
            className="shadow-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white border-0 px-8 py-4 rounded-full transition-all duration-500 hover:shadow-purple-500/25 relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.8 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-200%", "200%"] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />
            <div className="relative z-10 flex items-center gap-3">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <Presentation className="h-6 w-6" />
              </motion.div>
              <span className="font-semibold">Modo Apresentação</span>
            </div>
          </Button>
        </motion.div>
      </motion.div>

      {/* Presentation Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`fixed inset-0 bg-black z-50 flex flex-col ${showCursor ? "" : "cursor-none"}`}
            onMouseMove={handleMouseMove}
          >
            {/* Header */}
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center justify-between p-4 lg:p-6 bg-black/90 backdrop-blur-md border-b border-white/10 relative z-20"
            >
              <div className="flex items-center gap-4 lg:gap-8">
                <motion.h1
                  className="text-white text-lg lg:text-2xl font-bold"
                  animate={{
                    opacity: [0.8, 1, 0.8],
                    textShadow: [
                      "0 0 10px rgba(255,255,255,0.3)",
                      "0 0 20px rgba(255,255,255,0.6)",
                      "0 0 10px rgba(255,255,255,0.3)",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                >
                  Henrique Monteiro Cardoso
                </motion.h1>
                <div className="flex items-center gap-2 lg:gap-4">
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                  >
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border-white/30 px-2 py-1 lg:px-4 lg:py-2 text-xs lg:text-sm backdrop-blur-sm"
                    >
                      {currentSlide + 1} / {presentationSlides.length}
                    </Badge>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0, rotate: 90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
                  >
                    <Badge
                      variant="outline"
                      className="bg-white/10 text-white border-white/30 px-2 py-1 lg:px-4 lg:py-2 text-xs lg:text-sm backdrop-blur-sm"
                    >
                      {currentSlideData.title}
                    </Badge>
                  </motion.div>
                </div>
              </div>

              <div className="flex items-center gap-2 lg:gap-4">
                <AnimatePresence>
                  {isPlaying && (
                    <motion.div
                      initial={{ scale: 0, x: 50, opacity: 0 }}
                      animate={{ scale: 1, x: 0, opacity: 1 }}
                      exit={{ scale: 0, x: 50, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="flex items-center gap-2 lg:gap-4 text-white bg-white/10 rounded-full px-3 py-2 lg:px-6 lg:py-3 backdrop-blur-sm border border-white/20"
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <Clock className="h-4 w-4 lg:h-5 lg:w-5" />
                      </motion.div>
                      <motion.span
                        className="text-sm lg:text-lg font-mono font-bold"
                        animate={{
                          scale: timeLeft <= 5 ? [1, 1.1, 1] : 1,
                          color: timeLeft <= 5 ? ["#ffffff", "#ef4444", "#ffffff"] : "#ffffff",
                        }}
                        transition={{ duration: 0.5, repeat: timeLeft <= 5 ? Number.POSITIVE_INFINITY : 0 }}
                      >
                        {timeLeft}s
                      </motion.span>
                      <div className="w-8 h-2 lg:w-16 lg:h-3 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full relative overflow-hidden"
                          style={{ width: `${progress}%` }}
                          transition={{ duration: 0.1 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-white/40"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleFullscreen}
                    className="text-white hover:bg-white/20 rounded-full w-10 h-10 lg:w-12 lg:h-12 transition-all duration-300 hover:shadow-lg"
                  >
                    <Maximize2 className="h-4 w-4 lg:h-5 lg:w-5" />
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 rounded-full w-10 h-10 lg:w-12 lg:h-12 transition-all duration-300 hover:shadow-lg"
                  >
                    <X className="h-4 w-4 lg:h-5 lg:w-5" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Slide Content */}
            <div className="flex-1 relative overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.8 },
                    scale: { duration: 0.8 },
                    rotateY: { duration: 1.2 },
                    filter: { duration: 0.6 },
                  }}
                  className="absolute inset-0 flex items-center justify-center py-4 lg:py-8"
                  style={{
                    background: currentSlideData.background,
                    rotateX: rotateX,
                    rotateY: rotateY,
                  }}
                >
                  <motion.div
                    variants={backgroundVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                    }}
                  />

                  <div className="w-full relative z-10 overflow-y-auto max-h-full">
                    <motion.div
                      initial={{ y: 100, opacity: 0, scale: 0.9 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="text-center mb-6 lg:mb-12 px-4"
                    >
                      <motion.h2
                        className={`text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 lg:mb-6 ${currentSlideData.textColor || "text-white"}`}
                        animate={{
                          textShadow: [
                            "0 0 30px rgba(255,255,255,0.5)",
                            "0 0 60px rgba(255,255,255,0.8)",
                            "0 0 30px rgba(255,255,255,0.5)",
                          ],
                          y: [0, -5, 0],
                        }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                        whileHover={{
                          scale: 1.02,
                          textShadow: "0 0 80px rgba(255,255,255,1)",
                        }}
                      >
                        {currentSlideData.title}
                      </motion.h2>
                      {currentSlideData.subtitle && (
                        <motion.p
                          className={`text-lg md:text-xl lg:text-2xl xl:text-3xl font-light ${currentSlideData.textColor || "text-white"} opacity-90`}
                          initial={{ y: 30, opacity: 0, scale: 0.9 }}
                          animate={{ y: 0, opacity: 0.9, scale: 1 }}
                          transition={{ delay: 0.7, duration: 1 }}
                          animate={{
                            textShadow: [
                              "0 0 15px rgba(255,255,255,0.3)",
                              "0 0 25px rgba(255,255,255,0.5)",
                              "0 0 15px rgba(255,255,255,0.3)",
                            ],
                          }}
                        >
                          {currentSlideData.subtitle}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      className="flex items-center justify-center px-4"
                      initial={{ opacity: 0, scale: 0.8, y: 50 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      {currentSlideData.content}
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center justify-between p-4 lg:p-6 bg-black/90 backdrop-blur-md border-t border-white/10 relative z-20"
            >
              <div className="flex items-center gap-3 lg:gap-6">
                <motion.div
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="text-white hover:bg-white/20 disabled:opacity-50 rounded-full w-10 h-10 lg:w-14 lg:h-14 transition-all duration-300 hover:shadow-lg disabled:hover:scale-100"
                  >
                    <SkipBack className="h-4 w-4 lg:h-6 lg:w-6" />
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePlay}
                    className="text-white hover:bg-white/20 rounded-full w-12 h-12 lg:w-16 lg:h-16 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:shadow-lg border border-white/20"
                  >
                    <motion.div
                      animate={{ rotate: isPlaying ? 0 : 360 }}
                      transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
                    >
                      {isPlaying ? (
                        <Pause className="h-6 w-6 lg:h-8 lg:w-8" />
                      ) : (
                        <Play className="h-6 w-6 lg:h-8 lg:w-8" />
                      )}
                    </motion.div>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextSlide}
                    disabled={currentSlide === presentationSlides.length - 1}
                    className="text-white hover:bg-white/20 disabled:opacity-50 rounded-full w-10 h-10 lg:w-14 lg:h-14 transition-all duration-300 hover:shadow-lg disabled:hover:scale-100"
                  >
                    <SkipForward className="h-4 w-4 lg:h-6 lg:w-6" />
                  </Button>
                </motion.div>
              </div>

              {/* Slide Navigation */}
              <div className="flex items-center gap-2 lg:gap-3">
                {presentationSlides.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`relative transition-all duration-500 ${
                      index === currentSlide
                        ? "w-8 h-3 lg:w-12 lg:h-4 bg-white rounded-full"
                        : "w-3 h-3 lg:w-4 lg:h-4 bg-white/40 hover:bg-white/60 rounded-full"
                    }`}
                    whileHover={{ scale: 1.3, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {index === currentSlide && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                        layoutId="activeSlide"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(168, 85, 247, 0.4)",
                            "0 0 0 8px rgba(168, 85, 247, 0)",
                            "0 0 0 0 rgba(168, 85, 247, 0)",
                          ],
                        }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="flex items-center gap-2 lg:gap-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 rounded-full w-10 h-10 lg:w-12 lg:h-12 transition-all duration-300 hover:shadow-lg"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Volume2 className="h-4 w-4 lg:h-5 lg:w-5" />
                    </motion.div>
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Custom Cursor */}
            <AnimatePresence>
              {!showCursor && (
                <motion.div
                  className="fixed pointer-events-none z-50 w-8 h-8 bg-white/20 rounded-full backdrop-blur-sm border border-white/40"
                  style={{
                    left: mousePosition.x - 16,
                    top: mousePosition.y - 16,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <motion.div
                    className="w-full h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
