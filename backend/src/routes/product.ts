import { Router } from 'express';
import { AppDataSource } from '../ormconfig';
import { Product } from '../models/Product';

const router = Router();
const productRepository = AppDataSource.getRepository(Product);

// Получить список товаров
router.get('/', async (req, res) => {
  try {
    const products = await productRepository.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка получения товаров' });
  }
});

// Создать новый товар
router.post('/', async (req, res) => {
  try {
    const newProduct = productRepository.create(req.body);
    await productRepository.save(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: 'Ошибка при создании товара' });
  }
});

// Получить товар по ID
router.get('/:id', async (req, res) => {
  try {
    const product = await productRepository.findOneBy({ id: Number(req.params.id) });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Товар не найден' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Ошибка получения товара' });
  }
});

// Обновить товар по ID
router.put('/:id', async (req, res) => {
  try {
    const product = await productRepository.findOneBy({ id: Number(req.params.id) });
    if (product) {
      productRepository.merge(product, req.body);
      await productRepository.save(product);
      res.json(product);
    } else {
      res.status(404).json({ message: 'Товар не найден' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Ошибка обновления товара' });
  }
});

// Удалить товар по ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await productRepository.delete(req.params.id);
    if (result.affected) {
      res.json({ message: 'Товар удален' });
    } else {
      res.status(404).json({ message: 'Товар не найден' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Ошибка удаления товара' });
  }
});

export default router;