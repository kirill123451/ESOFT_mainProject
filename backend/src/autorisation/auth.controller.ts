import {Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import prisma from '../prisma/client'
import { createToken } from './JWT.service'

export const register = async (req: Request, res: Response) => {
    const {email, password, name} = req.body

    try {
        const existUser = await prisma.user.findUnique({where: {email}})
        if (existUser) {
            res.status(500).json({error : "Данный email уже используется"})
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
        res.json({token})
    }catch(err) {
        res.status(500).json({err: `Регистрация не выполелна}`})
    }
}

export const login = async(req:Request, res: Response) => {
    const {email, password} = req.body

    try{
        const user = await prisma.user.findUnique({where: {email}})
        if(!user) {
            return res.status(401).json({error : 'Неверные данные'})
        }

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return res.status(401).json({error: "Неверные данные"})
        }

        const token = createToken(user.id)
        res.json({token})
    }catch(err) {
        res.status(500).json({err: 'Ошибка входа'})
    }
}