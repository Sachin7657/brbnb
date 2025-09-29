"use client"

import { useMemo } from "react"
import { getBookings, getListings } from "@/lib/mock-data"
import { useAuth } from "@/hooks/use-auth"
import { ListingCard } from "@/components/listing-card"

export default function DashboardPage() {
  const { user } = useAuth()
  const listings = getListings()
  const bookings = getBookings()

  const myListings = useMemo(() => (user ? listings.filter((l) => l.hostId === user.id) : []), [listings, user])
  const myBookings = useMemo(() => (user ? bookings.filter((b) => b.userId === user.id) : []), [bookings, user])

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-8">
      <h1 className="text-2xl font-semibold">Your dashboard</h1>

      {!user && (
        <p className="text-sm text-foreground/70">
          Please use the Demo Login in the header to view your listings and bookings.
        </p>
      )}

      <section aria-labelledby="my-listings" className="grid gap-3">
        <div className="flex items-center justify-between">
          <h2 id="my-listings" className="text-lg font-semibold">
            My Listings
          </h2>
          <a href="/host/new" className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
            New listing
          </a>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {myListings.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
          {myListings.length === 0 && <p className="text-sm text-foreground/70">No listings yet.</p>}
        </div>
      </section>

      <section aria-labelledby="my-bookings" className="grid gap-3">
        <h2 id="my-bookings" className="text-lg font-semibold">
          My Bookings
        </h2>
        <div className="grid gap-2">
          {myBookings.map((b) => {
            const stay = listings.find((l) => l.id === b.listingId)
            if (!stay) return null
            return (
              <div key={b.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="grid">
                  <span className="text-sm font-medium">{stay.title}</span>
                  <span className="text-xs text-foreground/70">
                    {new Date(b.startDate).toLocaleDateString()} → {new Date(b.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-sm font-semibold">${b.totalPrice}</div>
              </div>
            )
          })}
          {myBookings.length === 0 && <p className="text-sm text-foreground/70">No bookings yet.</p>}
        </div>
      </section>
    </div>
  )
}
