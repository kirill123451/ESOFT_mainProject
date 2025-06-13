import "reflect-metadata"; 
import express from 'express';
import { AppDataSource } from "./ormconfig"; 
import productRoutes from './routes/product';

const app = express();
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Сервер работает');
});

AppDataSource.initialize()
  .then(() => {
    console.log("PostgreSQL подключен");

    app.use('/api/products', productRoutes);

    app.listen(3000, () => {
      console.log('Сервер запущен на http://localhost:3000');
    });
  })
  .catch((err) => {
    console.error("Ошибка подключения к базе данных", err);
  });