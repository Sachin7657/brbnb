"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BrandLogo } from "./brand-logo"
import { useAuth } from "@/hooks/use-auth"

export function SiteHeader() {
  const { user, loginDemo, logout } = useAuth()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <Link href="/" aria-label="Brbnb home" className="flex items-center gap-2">
          <BrandLogo className="text-xl" />
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href="/listings" className="text-foreground/80 hover:text-foreground">
            Explore Stays
          </Link>
          <Link href="/host/new" className="text-foreground/80 hover:text-foreground">
            Become a Host
          </Link>
          <Link href="/dashboard" className="text-foreground/80 hover:text-foreground">
            Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden text-sm text-foreground/80 sm:inline">Hi, {user.name}</span>
              <Button variant="outline" onClick={logout} aria-label="Logout">
                Logout
              </Button>
            </>
          ) : (
            <Button onClick={loginDemo} aria-label="Demo Login">
              Demo Login
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
