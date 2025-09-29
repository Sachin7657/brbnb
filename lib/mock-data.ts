/**
 * Simple in-memory data with optional localStorage persistence for preview.
 * In production, replace with Prisma + PostgreSQL and NextAuth.
 */
"use client"

import type { Listing, Booking, Review, User } from "./types"

const SEED_IMAGES = ["/cozy-apartment-interior.jpg", "/modern-loft-living-room.png", "/beachfront-villa-sunset.jpg"]

const seedListings: Listing[] = [
  {
    id: "lst_1",
    title: "Cozy City Apartment",
    description: "A bright and modern apartment in the heart of the city, steps from cafes and galleries.",
    location: "San Francisco, CA",
    pricePerNight: 180,
    guests: 2,
    rating: 4.8,
    images: [SEED_IMAGES[0]],
    hostId: "usr_host",
  },
  {
    id: "lst_2",
    title: "Beachfront Retreat",
    description: "Wake up to ocean views in this serene beachfront home. Perfect for couples or families.",
    location: "Malibu, CA",
    pricePerNight: 420,
    guests: 4,
    rating: 4.9,
    images: [SEED_IMAGES[2]],
    hostId: "usr_host",
  },
  {
    id: "lst_3",
    title: "Stylish Loft",
    description: "Industrial-chic loft with high ceilings and plenty of natural light.",
    location: "Brooklyn, NY",
    pricePerNight: 230,
    guests: 3,
    rating: 4.7,
    images: [SEED_IMAGES[1]],
    hostId: "usr_host",
  },
]

const STORAGE_KEYS = {
  listings: "brbnb_listings",
  bookings: "brbnb_bookings",
  reviews: "brbnb_reviews",
}

function safeParse<T>(raw: string | null, fallback: T): T {
  try {
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function getListings(): Listing[] {
  if (typeof window === "undefined") return seedListings
  const cached = safeParse<Listing[]>(window.localStorage.getItem(STORAGE_KEYS.listings), [])
  if (cached.length) return cached
  window.localStorage.setItem(STORAGE_KEYS.listings, JSON.stringify(seedListings))
  return seedListings
}

export function setListings(next: Listing[]) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STORAGE_KEYS.listings, JSON.stringify(next))
}

export function getBookings(): Booking[] {
  if (typeof window === "undefined") return []
  return safeParse<Booking[]>(window.localStorage.getItem(STORAGE_KEYS.bookings), [])
}

export function setBookings(next: Booking[]) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(next))
}

export function getReviews(): Review[] {
  if (typeof window === "undefined") return []
  return safeParse<Review[]>(window.localStorage.getItem(STORAGE_KEYS.reviews), [])
}

export function setReviews(next: Review[]) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STORAGE_KEYS.reviews, JSON.stringify(next))
}

export const demoUser: User = {
  id: "usr_demo",
  name: "Demo User",
  email: "demo@brbnb.com",
  image: "/placeholder-user.jpg",
}
