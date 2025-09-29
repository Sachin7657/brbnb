"use client"

import { useMemo, useState } from "react"
import { ListingCard } from "@/components/listing-card"
import { getListings } from "@/lib/mock-data"

export default function ListingsPage() {
  const all = getListings()
  const [location, setLocation] = useState<string>("")
  const [guests, setGuests] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(1000)

  const filtered = useMemo(() => {
    return all.filter((l) => {
      const matchLocation = location ? l.location.toLowerCase().includes(location.toLowerCase()) : true
      const matchGuests = guests ? l.guests >= guests : true
      const matchPrice = l.pricePerNight <= maxPrice
      return matchLocation && matchGuests && matchPrice
    })
  }, [all, location, guests, maxPrice])

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8">
      <h1 className="text-2xl font-semibold">Explore stays</h1>

      <div className="grid grid-cols-1 gap-3 rounded-xl border bg-card p-4 md:grid-cols-4">
        <div className="grid gap-1.5">
          <label htmlFor="loc" className="text-sm">
            Location
          </label>
          <input
            id="loc"
            className="rounded-md border bg-background px-2 py-2 text-sm"
            placeholder="City or region"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="guests" className="text-sm">
            Guests
          </label>
          <input
            id="guests"
            type="number"
            min={0}
            className="rounded-md border bg-background px-2 py-2 text-sm"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value || 0))}
          />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="price" className="text-sm">
            Max price
          </label>
          <input
            id="price"
            type="range"
            min={50}
            max={1000}
            step={10}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
          <span className="text-xs text-foreground/70">Up to ${maxPrice}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-sm text-foreground/70">No listings match your filters.</p>
        )}
      </div>
    </div>
  )
}
