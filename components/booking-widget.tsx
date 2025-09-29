"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Listing } from "@/lib/types"
import { useAuth } from "@/hooks/use-auth"
import { getBookings, setBookings } from "@/lib/mock-data"

function nightsBetween(start: Date, end: Date) {
  const ms = end.getTime() - start.getTime()
  return Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)))
}

export function BookingWidget({ listing }: { listing: Listing }) {
  const [start, setStart] = useState<string>("")
  const [end, setEnd] = useState<string>("")
  const { user } = useAuth()

  const total = useMemo(() => {
    if (!start || !end) return 0
    const n = nightsBetween(new Date(start), new Date(end))
    return n * listing.pricePerNight
  }, [start, end, listing.pricePerNight])

  function book() {
    if (!user) {
      alert("Please use Demo Login to book.")
      return
    }
    if (!start || !end) {
      alert("Please select dates.")
      return
    }
    const bookings = getBookings()
    bookings.push({
      id: crypto.randomUUID(),
      listingId: listing.id,
      userId: user.id,
      startDate: start,
      endDate: end,
      totalPrice: total,
    })
    setBookings(bookings)
    alert("Booking confirmed in demo mode!")
  }

  return (
    <Card>
      <CardContent className="grid gap-3 p-4">
        <div className="flex items-baseline justify-between">
          <p className="text-lg">
            <span className="font-semibold">${listing.pricePerNight}</span> night
          </p>
          <p className="text-sm text-foreground/70">★ {listing.rating.toFixed(1)}</p>
        </div>
        <div className="grid gap-2 md:grid-cols-2">
          <div className="grid gap-1.5">
            <label htmlFor="start" className="text-sm">
              Check-in
            </label>
            <input
              id="start"
              type="date"
              className="rounded-md border bg-background px-2 py-2 text-sm"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="end" className="text-sm">
              Check-out
            </label>
            <input
              id="end"
              type="date"
              className="rounded-md border bg-background px-2 py-2 text-sm"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground/80">Total</span>
          <span className="text-base font-semibold">${total || 0}</span>
        </div>
        <Button onClick={book} className="w-full" aria-label="Book now">
          Book
        </Button>
      </CardContent>
    </Card>
  )
}
