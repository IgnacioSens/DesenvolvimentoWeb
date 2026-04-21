// ─── Enums ────────────────────────────────────────────────────────────────────

export type CarCategory =
  | 'suv'
  | 'sedan'
  | 'hatchback'
  | 'pickup'
  | 'eletrico'
  | 'luxo'
  | 'esportivo'

export type FuelType =
  | 'gasolina'
  | 'etanol'
  | 'flex'
  | 'diesel'
  | 'eletrico'
  | 'hibrido'

export type Transmission = 'manual' | 'automatico' | 'cvt'

// ─── Core Entity ──────────────────────────────────────────────────────────────

export interface Car {
  id: string
  brand: string
  model: string
  year: number
  price: number
  category: CarCategory
  fuel_type: FuelType
  transmission: Transmission
  engine: string
  mileage: number
  seats: number
  color: string
  description: string
  image_url: string
  images: string[]
  view_count: number
  is_featured: boolean
  created_at: string
}

// ─── Filters & Sort ───────────────────────────────────────────────────────────

export interface CarFilters {
  category?: CarCategory
  brand?: string
  min_price?: number
  max_price?: number
  min_year?: number
  max_year?: number
  fuel_type?: FuelType
  transmission?: Transmission
}

export type SortOption =
  | 'relevance'
  | 'price_asc'
  | 'price_desc'
  | 'year_desc'
  | 'most_viewed'
