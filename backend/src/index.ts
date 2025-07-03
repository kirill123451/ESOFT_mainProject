import express, { Request, Response } from 'express'
import productRoutes from './routes/product.routes'


const app = express()
const PORT = 5173

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/products', productRoutes)

app.get('/', (req:Request, res:Response) => {
    res.send('Сервер работает')
})

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту:${PORT}`)
})