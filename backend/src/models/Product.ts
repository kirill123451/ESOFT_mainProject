import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column("decimal")
  price!: number;

  @Column({ nullable: true })
  size?: string;

  @Column({ nullable: true })
  color?: string;

  @Column({ nullable: true })
  category?: string;
}