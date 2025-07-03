import { Request, Response } from 'express'
import  prisma  from '../prisma/client'

interface ProductRequest {
  id: number
  individualName: string
  clothesType: string
  gender: string
  color: string
  material: string
  brand: string
  price: number
  img: string
  isSpecial: boolean
}

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany()
    res.json(products)
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: 'Ошибка получения товаров'
    })
  }
}

export const createProduct = async (req: Request<ProductRequest>, res: Response) => {
  const { individualName, clothesType, gender, color, material, brand, price, img, isSpecial } = req.body

  try {
    const newProduct = await prisma.product.create({
      data: {
        individualName,
        clothesType,
        gender,
        color,
        material,
        brand,
        price,
        img,
        isSpecial
      }
    })

    res.status(201).json(newProduct)
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: 'Ошибка при создании товара'
    })
  }
}