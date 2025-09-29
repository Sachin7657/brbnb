"use client"

import { useEffect, useState } from "react"
import type { User } from "@/lib/types"
import { demoUser } from "@/lib/mock-data"

const KEY = "brbnb_user"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const raw = typeof window !== "undefined" ? window.localStorage.getItem(KEY) : null
    if (raw) setUser(JSON.parse(raw))
  }, [])

  function loginDemo() {
    setUser(demoUser)
    window.localStorage.setItem(KEY, JSON.stringify(demoUser))
  }

  function logout() {
    setUser(null)
    window.localStorage.removeItem(KEY)
  }

  return { user, loginDemo, logout }
}
