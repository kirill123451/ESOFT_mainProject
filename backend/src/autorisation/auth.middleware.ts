import { Request, Response, NextFunction } from "express"
import { getUserFromToken } from "./JWT.service"

export const authMidl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            res.status(401).json({ error: 'Нет авторизации' })
            return
        }
        
        const user = await getUserFromToken(token);
        if (!user) {
            res.status(401).json({ error: 'Нет авторизации' })
            return
        }

        (req as any).user = user
        next()
    } catch (err) {
        res.status(401).json({ error: "Нет авторизации" })
    }
};