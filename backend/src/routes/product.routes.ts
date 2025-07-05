import { Router } from 'express'
import { createProduct, getAllProducts } from '../controllers/product.controller'
import { authMidl } from '../autorisation/auth.middleware'
import { requireRole } from '../autorisation/role.middleware'

const router = Router()

router.get('/', getAllProducts)
router.post('/', authMidl, requireRole('ADMIN'), createProduct)

export default router