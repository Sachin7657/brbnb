"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export function SearchBar() {
  const [location, setLocation] = useState("")
  const [guests, setGuests] = useState(1)
  const router = useRouter()

  function submit() {
    const params = new URLSearchParams()
    if (location) params.set("location", location)
    if (guests) params.set("guests", String(guests))
    router.push(`/listings?${params.toString()}`)
  }

  return (
    <div className="grid w-full grid-cols-1 gap-3 rounded-xl border bg-card p-4 md:grid-cols-3">
      <div className="grid gap-1.5">
        <Label htmlFor="loc">Location</Label>
        <Input
          id="loc"
          placeholder="Where to?"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-background"
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="guests">Guests</Label>
        <Input
          id="guests"
          type="number"
          min={1}
          value={guests}
          onChange={(e) => setGuests(Number.parseInt(e.target.value || "1"))}
          className="bg-background"
        />
      </div>
      <div className="flex items-end">
        <Button className="w-full" onClick={submit} aria-label="Search stays">
          Search
        </Button>
      </div>
    </div>
  )
}
