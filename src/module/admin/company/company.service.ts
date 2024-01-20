import { Injectable } from "@nestjs/common";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Company } from "./entities/company.entity";
import { Repository } from "typeorm";
import { User } from "../../user/entities/user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
  }

  async create(createCompanyDto: CreateCompanyDto, user: any) {
    const { name, surname, phone, isPayment, email, password, role } = user;

    // E-posta kontrolü
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      return {
        message: "Bu e-posta adresi zaten kayıtlı"
      };
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
      name: createCompanyDto.name,
      taxNumber: createCompanyDto.taxNumber,
      address: createCompanyDto.address,
      phone: createCompanyDto.phone,
      taxOffice: createCompanyDto.taxOffice,
      website: createCompanyDto.website,
      userId: newUser.id
    };

    await this.companyRepository.save(newCompany);
    return newUser;
  }

  async findAll() {
    return await this.companyRepository.find({
      relations: [
        "user"
      ]
    });
  }

  async findOne(id: number) {
    return await this.companyRepository.findOne({
      relations: [
        "user"
      ],
      where: { id: id }
    });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return await this.companyRepository.update(id, updateCompanyDto);
  }

  async delete(id: number) {
    return await this.companyRepository.delete(id);
  }
}
