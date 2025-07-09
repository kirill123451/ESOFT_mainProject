import { Router } from 'express';
import { getUserFromToken } from '../autorisation/JWT.service';

const router = Router();

router.get('/validate-token', async (req, res): Promise<void> => {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]

  if (!token) {
    res.status(401).json({ isValid: false })
    return
  }

  try {
    const user = await getUserFromToken(token)
    res.json({ isValid: !!user })
  } catch {
    res.status(401).json({ isValid: false })
  }
})

export default router;