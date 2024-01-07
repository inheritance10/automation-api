import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Company } from "../../../admin/company/entities/company.entity";
import { Advertisement } from "../../advertisement/entities/advertisement.entity";
import {File} from "../../../../file/entities/file.entity";

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  offerDetails: string; // Offer amount or details

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  offerDate: Date;

  @OneToMany(() => File, file => file.offer)
  files: File[];

  @ManyToOne(() => Company, company => company.offers)
  company: Company;

  @ManyToOne(() => Advertisement, advertisement => advertisement.offers)
  advertisement: Advertisement;
}
