import type { FoodCategory } from '../types/menu'

const BASE_URL = '/api/v1'

export async function fetchMenu(): Promise<FoodCategory[]> {
  const res = await fetch(`${BASE_URL}/foods/`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}
