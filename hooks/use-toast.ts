"use client"

import { useState, useCallback } from "react"

interface Toast {
  id: string
  title: string
  description?: string
  duration?: number
  variant?: "default" | "destructive"
}

interface ToastState {
  toasts: Toast[]
}

const initialState: ToastState = {
  toasts: [],
}

export function useToast() {
  const [state, setState] = useState<ToastState>(initialState)

  const toast = useCallback(({ title, description, duration = 5000, variant = "default" }: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: Toast = {
      id,
      title,
      description,
      duration,
      variant,
    }

    setState((prevState) => ({
      ...prevState,
      toasts: [...prevState.toasts, newToast],
    }))

    // Auto remove toast after duration
    setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        toasts: prevState.toasts.filter((t) => t.id !== id),
      }))
    }, duration)

    return {
      id,
      dismiss: () => {
        setState((prevState) => ({
          ...prevState,
          toasts: prevState.toasts.filter((t) => t.id !== id),
        }))
      },
    }
  }, [])

  const dismiss = useCallback((toastId?: string) => {
    setState((prevState) => ({
      ...prevState,
      toasts: toastId ? prevState.toasts.filter((t) => t.id !== toastId) : [],
    }))
  }, [])

  return {
    toast,
    dismiss,
    toasts: state.toasts,
  }
}
