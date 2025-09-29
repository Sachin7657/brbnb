"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export function ImageCarousel({ images }: { images: string[] }) {
  const [idx, setIdx] = React.useState(0)
  const list = images.length ? images : ["/listing-image.jpg"]
  function next() {
    setIdx((i) => (i + 1) % list.length)
  }
  function prev() {
    setIdx((i) => (i - 1 + list.length) % list.length)
  }
  return (
    <div className="relative overflow-hidden rounded-xl border">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={list[idx] || "/placeholder.svg"}
        alt={`Listing image ${idx + 1}`}
        className="aspect-[16/10] w-full object-cover"
      />
      <button
        type="button"
        onClick={prev}
        aria-label="Previous image"
        className={cn(
          "absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 px-3 py-1 text-sm",
          "hover:bg-background",
        )}
      >
        {"<"}
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next image"
        className={cn(
          "absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 px-3 py-1 text-sm",
          "hover:bg-background",
        )}
      >
        {">"}
      </button>
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
        {list.map((_, i) => (
          <span
            key={i}
            className={cn("h-1.5 w-1.5 rounded-full", i === idx ? "bg-primary" : "bg-foreground/30")}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  )
}
