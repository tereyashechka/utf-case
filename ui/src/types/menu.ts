export interface FoodItem {
  internal_code: number
  code: number
  name_ru: string
  description_ru: string | null
  description_en: string | null
  description_ch: string | null
  is_vegan: boolean
  is_special: boolean
  cost: string
  additional: number[]
}

export interface FoodCategory {
  id: number
  name_ru: string
  name_en: string | null
  name_ch: string | null
  order_id: number
  foods: FoodItem[]
}
