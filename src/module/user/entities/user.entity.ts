import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Company } from "../../admin/company/entities/company.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  role: string;

  @Column()
  isPayment: boolean;

  @Column()
  password: string;

  @OneToOne(() => Company, company => company.user)
  company: Company;

}
