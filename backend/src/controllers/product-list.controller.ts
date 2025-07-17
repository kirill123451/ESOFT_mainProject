import { Request, Response } from 'express'
import prisma from '../prisma/client'

interface ProductFromDB {
  id: number
  individualName: string
  clothesType?: string
  gender: string
  color: string
  material: string
  brand: string
  price: number
  imgUrl: string
  product_type: string
  isSpecial: boolean
}

export const getProductsList = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, special, search } = req.query
    let query = `
      SELECT 
        id, 
        "individualName", 
        "clothesType" 
        gender, 
        color, 
        material, 
        brand, 
        price, 
        "imgUrl", 
        "isSpecial", 
        "product_type"
      FROM "AllProducts"
    `
    
    const conditions: string[] = []
    const params: any[] = []
    
    if (type) {
      conditions.push(`"product_type" = $${params.length + 1}`)
      params.push(type)
    }
    
    if (special === 'true') {
      conditions.push(`"isSpecial" = true`)
    }
    
    if (search) {
      conditions.push(
        `("individualName" ILIKE $${params.length + 1} OR brand ILIKE $${params.length + 1})`
      )
      params.push(`%${search}%`)
    }
    
    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`
    }
    
    query += ' LIMIT 20'

    const products = await prisma.$queryRawUnsafe<ProductFromDB[]>(query, ...params)

    res.json(products.map((product: ProductFromDB) => ({
      id: product.id,
      individualName: product.individualName,
      type: product.clothesType,
      gender: product.gender,
      color: product.color,
      material: product.material,
      brand: product.brand,
      price: product.price,
      imgUrl: product.imgUrl,
      productType: product.product_type,
      isSpecial: product.isSpecial
    })))
  } catch (err) {
    console.error('Ошибка получения списка товаров:', err)
    res.status(500).json({ 
      success: false,
      error: 'Ошибка сервера'
    })
  }
}