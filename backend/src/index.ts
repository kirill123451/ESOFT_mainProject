import express, { Request, Response } from 'express'
import productRoutes from './routes/product.routes'
import authRoutes from './routes/auth.routes'
import { errorHandler } from './autorisation/error.middleware'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)

app.get('/', (req:Request, res:Response) => {
    res.send('Сервер работает')
})

app.use(errorHandler as express.ErrorRequestHandler)

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту:${PORT}`)
})