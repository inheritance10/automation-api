// Category Entity
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, ManyToOne } from "typeorm";
import { Advertisement } from "../../../customer/advertisement/entities/advertisement.entity";
import { File } from "../../../../file/entities/file.entity";


@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Advertisement, advertisement => advertisement.category)
  advertisements: Advertisement[];

}
