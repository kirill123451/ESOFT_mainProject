import { DataSource } from "typeorm";
import { Product } from "./models/Product";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Blades258",
  database: "myshop",
  synchronize: true, 
  logging: false,
  entities: [Product]
});