import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  JoinColumn
} from "typeorm";
import { Company } from "../../../admin/company/entities/company.entity";
import { Category } from "../../../admin/category/entities/category.entity";
import { Offer } from "../../offer/entities/offer.entity";
import { File } from "../../../../file/entities/file.entity";

@Entity()
export class Advertisement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyId: number;

  @Column()
  categoryId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate: Date;

  @ManyToOne(() => Company, company => company.advertisements)
  company: Company;

  @ManyToOne(() => Category, category => category.advertisements)
  @JoinColumn()
  category: Category;

  @OneToMany(() => Offer, offer => offer.advertisement)
  offers: Offer[];

  @OneToMany(() => File, file => file.advertisement)
  files: File[];
}
