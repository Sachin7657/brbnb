"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getListings, setListings } from "@/lib/mock-data"
import type { Listing } from "@/lib/types"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

export default function NewListingPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [price, setPrice] = useState(100)
  const [guests, setGuests] = useState(2)
  const [image, setImage] = useState("/new-listing.jpg")

  function submit() {
    if (!user) {
      alert("Please use Demo Login to create a listing.")
      return
    }
    const current = getListings()
    const newListing: Listing = {
      id: crypto.randomUUID(),
      title,
      description,
      location,
      pricePerNight: price,
      guests,
      rating: 5,
      images: [image],
      hostId: user.id,
    }
    setListings([newListing, ...current])
    alert("Listing created in demo mode!")
    router.push("/dashboard")
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Create a new listing</h1>
      <Card className="mt-4">
        <CardContent className="grid gap-3 p-4">
          <div className="grid gap-1.5">
            <label className="text-sm">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="grid gap-1.5">
            <label className="text-sm">Description</label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="grid gap-1.5">
            <label className="text-sm">Location</label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <label className="text-sm">Price / night ($)</label>
              <Input type="number" min={1} value={price} onChange={(e) => setPrice(Number(e.target.value || 1))} />
            </div>
            <div className="grid gap-1.5">
              <label className="text-sm">Guests</label>
              <Input type="number" min={1} value={guests} onChange={(e) => setGuests(Number(e.target.value || 1))} />
            </div>
          </div>
          <div className="grid gap-1.5">
            <label className="text-sm">Cover image URL</label>
            <Input value={image} onChange={(e) => setImage(e.target.value)} />
          </div>
          <Button onClick={submit} className="w-full">
            Create listing
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
