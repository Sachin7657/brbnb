import { notFound } from "next/navigation"
import { getListings } from "@/lib/mock-data"
import { ImageCarousel } from "@/components/image-carousel"
import { BookingWidget } from "@/components/booking-widget"

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  const listing = getListings().find((l) => l.id === params.id)
  if (!listing) return notFound()

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <ImageCarousel images={listing.images} />
        <div className="mt-4 grid gap-2">
          <h1 className="text-balance text-2xl font-semibold">{listing.title}</h1>
          <p className="text-sm text-foreground/80">{listing.location}</p>
          <p className="text-pretty text-sm leading-relaxed">{listing.description}</p>
          <ul className="mt-2 grid list-disc gap-1 pl-5 text-sm text-foreground/80">
            <li>Wi‑Fi</li>
            <li>Self check-in</li>
            <li>Kitchen</li>
          </ul>
          <p className="mt-2 text-sm text-foreground/70">Hosted by Host #{listing.hostId}</p>
        </div>
      </div>

      <aside className="md:col-span-1">
        <BookingWidget listing={listing} />
      </aside>
    </div>
  )
}
