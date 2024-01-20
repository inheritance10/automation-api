import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { Company } from "../admin/company/entities/company.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>
  ) {
  }

  async create(createUserDto: CreateUserDto, company: any) {
    const { name, surname, phone, isPayment, email, password, role } = createUserDto;

    // E-posta kontrolü
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      return {
        message: "Bu e-posta adresi zaten kayıtlı"
      }
    }

    // Şifre hashleme
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userRepository.save({
      name,
      surname,
      phone,
      isPayment,
      email,
      password: hashedPassword,
      role
    });

    const newCompany = {
      name: company.name,
      taxNumber: company.taxNumber,
      address: company.address,
      phone: company.phone,
      taxOffice: company.taxOffice,
      website: company.website,
      userId: newUser.id
    };

    await this.companyRepository.save(newCompany);
    return newUser;
  }

  async findAll() {
    return `This action returns all user`;
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({
      relations: ["company"],
      where: { email: email }
    });
  }

  async getById(id: number) {
    return await this.userRepository.findOne({
      relations: ["company"],
      where: { id: id }
    });
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }


}
