import { Router } from 'express'
import { 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  getAdminProducts 
} from '../controllers/admin.controller'
import { authMidl } from '../autorisation/auth.middleware'
import { requireRole } from '../autorisation/role.middleware'

const router = Router()

router.use(authMidl)
router.use(requireRole('ADMIN'))

router.get('/products', getAdminProducts)
router.post('/products', createProduct)
router.put('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)

export default router