import { Router } from 'express'
import { register, login, resetPassword, reqPasswrodReset } from '../autorisation/auth.controller'

const router = Router()
router.post('/register', async (req, res, next) => {
    try {
        await register(req, res)
    } catch (err) {
        next(err)
    }
})

router.post('/login', async (req, res, next) => {
    try {
        await login(req, res)
    } catch (err) {
        next(err)
    }
})

router.post('/request-password-reset', async (req, res, next) => {
    try {
        await reqPasswrodReset(req, res)
    } catch (err) {
        next(err)
    }
})

router.post('/reset-password', async (req, res, next) => {
    try {
        await resetPassword(req, res)
    } catch (err) {
        next(err)
    }
})

export default router
