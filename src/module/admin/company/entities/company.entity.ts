import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "../../../user/entities/user.entity";
import { Advertisement } from "../../../customer/advertisement/entities/advertisement.entity";
import { Offer } from "../../../customer/offer/entities/offer.entity";
import { File } from "../../../../file/entities/file.entity";

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(
    { nullable: false }
  )
  userId: number;

  @Column()
  taxNumber: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  taxOffice: string;

  @Column()
  website: string;

  @OneToOne(() => User, { onDelete: "CASCADE"})
  @JoinColumn()
  user: User;

  @OneToMany(() => Offer, offer => offer.company)
  offers: Offer[];

  @OneToMany(() => Advertisement, advertisement => advertisement.company)
  advertisements: Advertisement[];

}
