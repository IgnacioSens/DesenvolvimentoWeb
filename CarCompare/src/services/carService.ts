import { supabase } from '../lib/supabase'
import type { Car, CarFilters, SortOption } from '../types/car'

const TABLE = 'cars'

// ─── Listar veículos com filtros e paginação ──────────────────────────────────

export async function getCars(
  filters?: CarFilters,
  sort: SortOption = 'relevance',
  page = 1,
  limit = 12
): Promise<{ data: Car[]; count: number }> {
  let query = supabase.from(TABLE).select('*', { count: 'exact' })

  // Filtros
  if (filters?.category)     query = query.eq('category', filters.category)
  if (filters?.brand)        query = query.ilike('brand', `%${filters.brand}%`)
  if (filters?.fuel_type)    query = query.eq('fuel_type', filters.fuel_type)
  if (filters?.transmission) query = query.eq('transmission', filters.transmission)
  if (filters?.min_price)    query = query.gte('price', filters.min_price)
  if (filters?.max_price)    query = query.lte('price', filters.max_price)
  if (filters?.min_year)     query = query.gte('year', filters.min_year)
  if (filters?.max_year)     query = query.lte('year', filters.max_year)

  // Ordenação
  switch (sort) {
    case 'price_asc':   query = query.order('price', { ascending: true });  break
    case 'price_desc':  query = query.order('price', { ascending: false }); break
    case 'year_desc':   query = query.order('year',  { ascending: false }); break
    case 'most_viewed': query = query.order('view_count', { ascending: false }); break
    default:            query = query.order('created_at', { ascending: false })
  }

  // Paginação
  const from = (page - 1) * limit
  query = query.range(from, from + limit - 1)

  const { data, count, error } = await query
  if (error) throw error
  return { data: (data as Car[]) ?? [], count: count ?? 0 }
}

// ─── Buscar veículo por ID ────────────────────────────────────────────────────

export async function getCarById(id: string): Promise<Car | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error

  // Incrementa view_count em background
  supabase
    .from(TABLE)
    .update({ view_count: (data as Car).view_count + 1 })
    .eq('id', id)
    .then(() => {})

  return data as Car
}

// ─── Veículos em tendência ────────────────────────────────────────────────────

export async function getTrendingCars(limit = 8): Promise<Car[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('view_count', { ascending: false })
    .limit(limit)

  if (error) throw error
  return (data as Car[]) ?? []
}

// ─── Veículos em destaque ─────────────────────────────────────────────────────

export async function getFeaturedCars(limit = 8): Promise<Car[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('is_featured', true)
    .limit(limit)

  if (error) throw error
  return (data as Car[]) ?? []
}

// ─── Veículos similares ───────────────────────────────────────────────────────

export async function getSimilarCars(car: Car, limit = 4): Promise<Car[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('category', car.category)
    .neq('id', car.id)
    .limit(limit)

  if (error) throw error
  return (data as Car[]) ?? []
}
