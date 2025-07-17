import { Request, Response } from 'express'
import prisma from '../prisma/client'

interface ProductResponse {
  id: number
  individualName: string
  type: string
  gender: string
  color: string
  material: string
  brand: string
  price: number
  imgUrl: string
  isSpecial: boolean
  product_type: string
}

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    
    if (!id || isNaN(Number(id))) {
      res.status(400).json({ error: 'Неверный ID товара' })
      return
    }

    const product = await prisma.$queryRawUnsafe(`
      SELECT * FROM "AllProducts" WHERE id = ${Number(id)} LIMIT 1
    `) as any[]

    if (!product || product.length === 0) {
      res.status(404).json({ error: 'Товар не найден' })
      return
    }

    

    const dbProduct = product[0]
    const productType = dbProduct.clothes_type || dbProduct.shoes_type || dbProduct.bags_type || 'Неизвестный тип'

    const response: ProductResponse = {
      id: dbProduct.id,
      individualName: dbProduct.individualName,
      type: productType,
      gender: dbProduct.gender,
      color: dbProduct.color,
      material: dbProduct.material,
      brand: dbProduct.brand,
      price: dbProduct.price,
      imgUrl: dbProduct.imgUrl,
      isSpecial: dbProduct.isSpecial,
      product_type: dbProduct.product_type
    }

    res.json(response)
  } catch (err) {
    console.error('Ошибка:', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
}

export const getProductsByType = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type } = req.params
    if (!type || typeof type !== 'string') {
      res.status(400).json({ error: 'Неверный тип продукта' })
      return
    }

    const products = await prisma.$queryRawUnsafe(`
      SELECT * FROM "AllProducts" WHERE product_type = '${type}'
    `) as any[]

    const response = products.map(dbProduct => ({
      id: dbProduct.id,
      individualName: dbProduct.individualName,
      clothesType: type === 'clothes' ? dbProduct.type : undefined,
      shoesType: type === 'shoes' ? dbProduct.type : undefined,
      bagsType: type === 'bags' ? dbProduct.type : undefined,
      gender: dbProduct.gender,
      color: dbProduct.color,
      material: dbProduct.material,
      brand: dbProduct.brand,
      price: dbProduct.price,
      imgUrl: dbProduct.imgUrl,
      isSpecial: dbProduct.isSpecial,
      productType: dbProduct.product_type
    }))

    res.json(response)
  } catch (err) {
    console.error('Ошибка получения товаров по типу:', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
}

export const filterProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, minPrice, maxPrice, material, clothesType, shoesType, bagsType } = req.query

    const brands = req.query['brands[]'] || req.query.brands

    if (!type || !['clothes', 'shoes', 'bags'].includes(type as string)) {
      res.status(400).json({ error: 'Неверный тип продукта' })
      return
    }

    const min = minPrice ? Number(minPrice) : undefined
    const max = maxPrice ? Number(maxPrice) : undefined

    if (min && isNaN(min)) {
      res.status(400).json({ error: 'minPrice должен быть числом' })
      return
    }

    if (max && isNaN(max)) {
      res.status(400).json({ error: 'maxPrice должен быть числом' })
      return
    }

    let query = `SELECT * FROM "AllProducts" WHERE product_type = '${type}'`

    if (min !== undefined && max !== undefined) {
      query += ` AND price BETWEEN ${min} AND ${max}`
    }

    if (brands) {
  const brandsList = Array.isArray(brands) ? brands : [brands]
  if (brandsList.length > 0 && brandsList[0] !== '') {
    query += ` AND brand IN (${brandsList.map(b => `'${b}'`).join(',')})`
  }
}

    if (material) {
  const materialsList = Array.isArray(material) ? material : [material]
  if (materialsList.length > 0 ) {
    query += ` AND material IN (${materialsList.map(m => `'${m}'`).join(',')})`
  }
}

    let typeFilter = clothesType
    if (type === 'shoes') typeFilter = shoesType
    if (type === 'bags') typeFilter = bagsType

    if (typeFilter) {
      const typeField = `${type}Type`
      const typesList = Array.isArray(typeFilter) ? typeFilter : [typeFilter]
      if (typesList.length > 0) {
        query += ` AND "${typeField}" IN (${typesList.map(t => `'${t}'`).join(',')})`
      }
    }

    console.log('Executing query:', query)
    const products = await prisma.$queryRawUnsafe(query)
    
    res.status(200).json(products)
    
  } catch (err) {
    console.error('Ошибка фильтрации:', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
}


export const getSpecialOffers = async (req: Request, res: Response): Promise<void> => {
  try {

    const specialProducts = await prisma.$queryRawUnsafe(`
      SELECT * FROM "AllProducts" 
      WHERE "isSpecial" = true
    `) as any[]

    res.status(200).json(specialProducts)
  } catch (err) {
    console.error('Ошибка загрузки спецпредложений:', err)
    res.status(500).json({ 
      error: 'Ошибка сервера',
      details: err instanceof Error ? err.message : String(err)
    })
  }
}