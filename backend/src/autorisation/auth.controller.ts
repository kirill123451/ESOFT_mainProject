import {Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import prisma from '../prisma/client'
import { createToken } from './JWT.service'
import { logForm, passwordResetRequestForm, passwordResetForm, regForm } from './auth.validator'
import { z } from 'zod'
import { RegisterRequest, LoginRequest } from '../types/auth'
import crypto from 'crypto'

export const register = async (req: Request<{}, {}, RegisterRequest>, res: Response) => {
    try {
        const {email, password, name} = regForm.parse(req.body)
        const existUser = await prisma.user.findUnique({where: {email}})
        if (existUser) {
            return res.status(400).json({error : "Данный email уже используется"})
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                email,
                password: hashPassword,
                name
            }
        })
        const token = createToken(user.id)
        return res.json({token})
    }catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Ошибка валидации',
        details: err.errors.map(error => ({
          path: error.path.join('.'),
          message: error.message
        }))
      })
    }
    return res.status(500).json({ error: 'Ошибка регистрации' })
  }
}

export const login = async(req: Request<{}, {}, LoginRequest>, res: Response) => {
    try{
        const {email, password} = logForm.parse(req.body)
        const user = await prisma.user.findUnique({where: {email}})
        if(!user) {
            return res.status(401).json({error : 'Неверные данные'})
        }

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return res.status(401).json({error: "Неверные данные"})
        }

        const token = createToken(user.id)
        return res.json({token})
    }catch(err) {
        if (err instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Ошибка валидации',
        details: err.errors.map(error => ({
          path: error.path.join('.'),
          message: error.message
        }))
      })
    }   
        return res.status(500).json({ error: 'Ошибка входа' })
    }
}

export const reqPasswrodReset = async (req: Request, res: Response) => {
    try {
        const { email } = passwordResetRequestForm.parse(req.body)
        const user = await prisma.user.findUnique({where: {email}})
        if (!user) {
            return res.status(404).json({error : "Пользователь не найден"})
        }

        const resetToken = crypto.randomBytes(20).toString('hex')
        const resetTokenExpires = new Date(Date.now() + 3600000)

        await prisma.user.update ({
            where: {id: user.id},
            data: {
                resetToken,
                resetTokenExpires
            }
        })

        return res.json({ message: 'Ссылка для сброса пароля отправлена' })

    } catch (err) {
    return res.status(500).json({ error: 'Ошибка при запросе сброса пароля' })
  }
}

 export const resetPassword = async (req: Request, res: Response) => {
  try {
     const { token, newPassword } = passwordResetForm.parse(req.body)
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpires: { gt: new Date() }
      }
    })

    if (!user) {
      return res.status(400).json({ error: 'Неверный или просроченный токен' })
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: await bcrypt.hash(newPassword, 10),
        resetToken: null,
        resetTokenExpires: null
      }
    })

    return res.json({ message: 'Пароль успешно изменен' })

  } catch (err) {
    return res.status(500).json({ error: 'Ошибка при сбросе пароля' })
  }
}