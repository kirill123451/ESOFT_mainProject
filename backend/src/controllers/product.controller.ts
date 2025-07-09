import { Request, Response } from 'express'
import prisma from '../prisma/client'
import { string } from 'zod'

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
      isSpecial: dbProduct.isSpecial
    };

    res.json(response)
  } catch (err) {
    console.error('Ошибка:', err)
    res.status(500).json({ error: 'Ошибка сервера' })
  }
};

export const getProductsByType = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type } = req.params;
    if (!type || typeof type !== 'string') {
      res.status(400).json({ error: 'Неверный тип продукта' });
      return;
    }

    const products = await prisma.$queryRawUnsafe(`
      SELECT * FROM "AllProducts" WHERE product_type = '${type}'
    `) as any[];

    const response: ProductResponse[] = products.map(dbProduct => ({
      id: dbProduct.id,
      individualName: dbProduct.individualName,
      type: dbProduct.clothes_type || dbProduct.shoes_type || dbProduct.bags_type || 'Неизвестный тип',
      gender: dbProduct.gender,
      color: dbProduct.color,
      material: dbProduct.material,
      brand: dbProduct.brand,
      price: dbProduct.price,
      imgUrl: dbProduct.imgUrl,
      isSpecial: dbProduct.isSpecial
    }));

    res.json(response);
  } catch (err) {
    console.error('Ошибка получения товаров по типу:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
}