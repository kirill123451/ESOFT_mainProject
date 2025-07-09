import express, { Request, Response } from 'express'
import cors from 'cors'
import productRoutes from './routes/product.routes'
import authRoutes from './routes/auth.routes'
import { errorHandler } from './autorisation/error.middleware'
import tokenRoutes from './routes/token.routes'

const app = express()
const PORT = 3000

app.use(cors({
  origin: true,
  credentials: true,
  exposedHeaders: ['*']
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/auth', tokenRoutes)
app.use('/auth', authRoutes)
app.use('/product', productRoutes)

app.get('/', (req:Request, res:Response) => {
    res.send('Сервер работает')
})

app.use(errorHandler as express.ErrorRequestHandler)

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту:${PORT}`)
})