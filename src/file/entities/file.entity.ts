import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Advertisement } from "../../module/customer/advertisement/entities/advertisement.entity";
import { Company } from "../../module/admin/company/entities/company.entity";
import { Category } from "../../module/admin/category/entities/category.entity";
import { Offer } from "../../module/customer/offer/entities/offer.entity";


@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column()
  filePath: string;

  @Column()
  fileType: string;

  @Column({ nullable: true })
  advertisementId: number;

  @Column({ nullable: true })
  offerId: number;

  @ManyToOne(() => Advertisement, advertisement => advertisement.files)
  advertisement: Advertisement;

  @ManyToOne(() => Offer, offer => offer.files)
  offer: Offer;
}
