export type User = {
  id: string
  name: string
  email: string
  image?: string
}

export type Listing = {
  id: string
  title: string
  description: string
  location: string
  pricePerNight: number
  guests: number
  rating: number
  images: string[]
  hostId: string
}

export type Booking = {
  id: string
  listingId: string
  userId: string
  startDate: string // ISO
  endDate: string // ISO
  totalPrice: number
}

export type Review = {
  id: string
  listingId: string
  userId: string
  rating: number
  comment: string
  createdAt: string
}
