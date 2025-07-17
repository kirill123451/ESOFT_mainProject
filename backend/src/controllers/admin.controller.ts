import { Request, Response } from 'express'
import prisma from '../prisma/client'

interface ProductData {
  individualName: string
  gender: string
  color: string
  material: string
  brand: string
  price: number
  imgUrl: string
  isSpecial: boolean
  category: 'clothes' | 'shoes' | 'bags'
  clothesType: string
  shoesType: string
  bagType: string
}

export const getAdminProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await prisma.$queryRaw<Array<{
      id: number
      individualName: string
      product_type: string
      clothesType: string
      gender: string
      color: string
      material: string
      brand: string
      price: number
      imgUrl: string
      isSpecial: boolean
    }>>`
      SELECT 
        id,
        "individualName",
        "product_type" as "category",
        "clothesType" as "type",
        "gender",
        "color",
        "material",
        "brand",
        "price",
        "imgUrl",
        "isSpecial"
      FROM "AllProducts"
    `
    
    res.status(200).json(products)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ 
      error: 'Server error',
      details: error instanceof Error ? error.message : String(error)
    })
  }
}

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, ...data } = req.body as ProductData

    if (!data.individualName || !data.gender || !data.color || 
        !data.material || !data.brand || isNaN(data.price)) {
      res.status(400).json({ error: 'Не все обязательные поля заполнены корректно' })
      return
    }

    const baseData = {
      individualName: data.individualName,
      gender: data.gender,
      color: data.color,
      material: data.material,
      brand: data.brand,
      price: Number(data.price),
      imgUrl: data.imgUrl || '#',
      isSpecial: Boolean(data.isSpecial)
    }

    let newProduct
    switch (category) {
      case 'clothes':
        newProduct = await prisma.clothes.create({ 
          data: { 
            ...baseData,
            clothesType: data.clothesType || ''
          } 
        })
        break
      case 'shoes':
        newProduct = await prisma.shoes.create({ 
          data: { 
            ...baseData,
            shoesType: data.shoesType || ''
          } 
        })
        break
      case 'bags':
        newProduct = await prisma.bags.create({ 
          data: { 
            ...baseData,
            bagType: data.bagType || ''
          } 
        })
        break
      default:
        res.status(400).json({ error: 'Неверная категория товара' })
        return
    }
    
    res.status(201).json({ ...newProduct, category })
  } catch (error) {
    console.error('Create product error:', error)
    res.status(500).json({ 
      error: 'Ошибка создания товара',
      details: error instanceof Error ? error.message : String(error)
    })
  }
}
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const { category, ...data } = req.body as ProductData

    if (!id || isNaN(Number(id))) {
      res.status(400).json({ error: 'Неверный ID товара' })
      return
    }

    if (!data.individualName || !data.gender || !data.color || 
        !data.material || !data.brand || isNaN(data.price)) {
      res.status(400).json({ error: 'Не все обязательные поля заполнены корректно' })
      return
    }

    const baseData = {
      individualName: data.individualName,
      gender: data.gender,
      color: data.color,
      material: data.material,
      brand: data.brand,
      price: Number(data.price),
      imgUrl: data.imgUrl,
      isSpecial: Boolean(data.isSpecial)
    }

    let updatedProduct
    switch (category) {
      case 'clothes':
        updatedProduct = await prisma.clothes.update({
          where: { id: Number(id) },
          data: { 
            ...baseData,
            clothesType: data.clothesType || ''
          }
        })
        break
      case 'shoes':
        updatedProduct = await prisma.shoes.update({
          where: { id: Number(id) },
          data: { 
            ...baseData,
            shoesType: data.shoesType || ''
          }
        })
        break
      case 'bags':
        updatedProduct = await prisma.bags.update({
          where: { id: Number(id) },
          data: { 
            ...baseData,
            bagType: data.bagType || ''
          }
        })
        break
      default:
        res.status(400).json({ error: 'Неверная категория товара' })
        return
    }
    
    res.status(200).json({ ...updatedProduct, category })
  } catch (error) {
    console.error('Update product error:', error)
    res.status(500).json({ 
      error: 'Ошибка обновления товара',
      details: error instanceof Error ? error.message : String(error)
    })
  }
}

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const { category } = req.body as { category: 'clothes' | 'shoes' | 'bags' }

    if (!id || isNaN(Number(id))) {
      res.status(400).json({ error: 'Неверный ID товара' })
      return
    }

    if (!['clothes', 'shoes', 'bags'].includes(category)) {
      res.status(400).json({ error: 'Неверная категория товара' })
      return
    }

    switch (category) {
      case 'clothes':
        await prisma.clothes.delete({ where: { id: Number(id) } })
        break
      case 'shoes':
        await prisma.shoes.delete({ where: { id: Number(id) } })
        break
      case 'bags':
        await prisma.bags.delete({ where: { id: Number(id) } })
        break
    }
    
    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Delete product error:', error)
    res.status(500).json({ 
      error: 'Ошибка удаления товара',
      details: error instanceof Error ? error.message : String(error)
    })
  }
}