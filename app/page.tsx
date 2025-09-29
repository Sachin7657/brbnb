import { SearchBar } from "@/components/search-bar"
import { ListingCard } from "@/components/listing-card"
import { getListings } from "@/lib/mock-data"

export default function HomePage() {
  const listings = getListings() // seed used when SSR; client will hydrate
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-8">
      <section className="grid gap-6">
        <h1 className="text-balance text-3xl font-semibold md:text-4xl">
          Find your next stay on <span className="text-primary">Brbnb</span>
        </h1>
        <p className="max-w-prose text-foreground/80">
          Book unique homes and experiences. Simple, secure, and designed for comfort.
        </p>
        <SearchBar />
      </section>

      <section aria-labelledby="featured">
        <div className="mb-3 flex items-center justify-between">
          <h2 id="featured" className="text-lg font-semibold">
            Featured listings
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.slice(0, 6).map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      </section>

      <section className="rounded-xl border bg-card p-4">
        <div className="flex flex-col items-center justify-between gap-3 rounded-lg bg-secondary p-4 md:flex-row">
          <div className="text-center md:text-left">
            <h3 className="text-pretty text-lg font-semibold">Host on Brbnb</h3>
            <p className="text-sm text-foreground/80">Share your space and earn on your terms.</p>
          </div>
          <a
            href="/host/new"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Become a Host
          </a>
        </div>
      </section>
    </div>
  )
}
