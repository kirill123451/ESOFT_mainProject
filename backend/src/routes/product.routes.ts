import { Router } from 'express'
import {  getProductById, getProductsByType, filterProducts, getSpecialOffers } from '../controllers/product.controller'
import { authMidl } from '../autorisation/auth.middleware'
import { requireRole } from '../autorisation/role.middleware'
// import { createProduct } from '../controllers/product-create.controller'
import { getProductsList } from '../controllers/product-list.controller'

const router = Router()

router.get('/', getProductsList)

router.get('/filter', (req, res) => filterProducts(req, res))

router.get('/special-offers', getSpecialOffers)

router.get('/:id', getProductById);

router.get('/full/:type', getProductsByType)


// router.post('/product/', authMidl, requireRole('ADMIN'), createProduct)

export default router