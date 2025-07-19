import  jwt  from "jsonwebtoken"
import  prisma  from '../prisma/client'

const secretJWT = process.env.JWT_SECRET || 'secret111'

export const createToken = (userId: string) => {
    return jwt.sign({ userId }, secretJWT, { expiresIn: '14d' })
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, secretJWT) as { userId: string }
}

export const getUserFromToken = async (token: string) => {
    try {
        const { userId } = verifyToken(token)
        return await prisma.user.findUnique({ where: { id: userId } })
    } catch {
        return null
    }
}