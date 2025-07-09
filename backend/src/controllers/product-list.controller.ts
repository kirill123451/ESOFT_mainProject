import { Request, Response } from 'express';
import prisma from '../prisma/client';

interface ProductFromDB {
  id: number;
  individualName: string;  // строчные буквы, как в работающем коде
  clothes_type?: string;   // snake_case из БД
  shoes_type?: string;
  bags_type?: string;
  gender: string;
  color: string;
  material: string;
  brand: string;
  price: number;
  imgUrl: string;         // camelCase, как в работающем коде
  product_type: string;
  isSpecial: boolean;
}

export const getProductsList = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, special } = req.query;
    
    let query = 'SELECT * FROM "AllProducts"';
    const conditions = [];
    
    if (type) conditions.push(`product_type = '${type}'`);
    if (special === 'true') conditions.push('isSpecial = true');
    
    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }
    
    query += ' LIMIT 20';

    const products = await prisma.$queryRawUnsafe<ProductFromDB[]>(query);

    const response = products.map(product => ({
      id: product.id,
      individualName: product.individualName,
      clothesType: product.clothes_type,
      shoesType: product.shoes_type,
      bagsType: product.bags_type,
      gender: product.gender,
      color: product.color,
      material: product.material,
      brand: product.brand,
      price: product.price,
      imgUrl: product.imgUrl,
      productType: product.product_type,
      isSpecial: product.isSpecial
    }));
console.log('Products from DB:', products)
    res.json(response);
  } catch (err) {
    console.error('Ошибка получения списка товаров:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};
