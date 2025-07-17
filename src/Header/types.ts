export interface Product {
  id: number
  individualName: string
  type?: string
  gender: string
  color: string
  material: string
  brand: string
  price: number
  imgUrl: string
  isSpecial: boolean
  productType?: 'clothes' | 'shoes' | 'bags'
  category?: 'clothes' | 'shoes' | 'bags'
}

export interface BasketItem {
  product: Product
  quantity: number
}

export interface UserData {
  email: string
  name: string | null
  role: 'USER' | 'ADMIN'
  id: string
}