"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState} from "react"
import { Progress } from "./ui/progress"

export function GlobalPageLoader() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setLoading(true)
    setProgress(0)

    const increment = () => {
      setProgress((prev) => {
        const next = prev + Math.random() * 10
        return next >= 90 ? 90 : next
      })
    }

    const interval = setInterval(increment, 150)

    const timeout = setTimeout(() => {
      clearInterval(interval)
      setProgress(100)
      setTimeout(() => setLoading(false), 300)
    }, 1000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [pathname])

  if (!loading) return null

  return (
    <>
      <Progress value={progress} className="fixed top-0 left-0 w-full z-500 h-2 bg-muted bg-[var(--primary)]" />
    </>
  )
}
