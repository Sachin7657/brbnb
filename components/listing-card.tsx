import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { Listing } from "@/lib/types"

export function ListingCard({ listing }: { listing: Listing }) {
  const cover = listing.images[0] ?? "/stay-photo.jpg"
  return (
    <Link href={`/listings/${listing.id}`} className="block focus:outline-none">
      <Card className="overflow-hidden transition hover:shadow-md focus-visible:ring-2">
        <div className="aspect-[4/3] w-full bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cover || "/placeholder.svg"}
            alt={`${listing.title} cover`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <CardContent className="grid gap-1 p-3">
          <div className="flex items-center justify-between">
            <h3 className="text-pretty text-sm font-medium">{listing.title}</h3>
            <span className="text-sm text-foreground/80">★ {listing.rating.toFixed(1)}</span>
          </div>
          <p className="text-xs text-foreground/70">{listing.location}</p>
          <p className="text-sm">
            <span className="font-semibold">${listing.pricePerNight}</span> night
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
