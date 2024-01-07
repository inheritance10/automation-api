import { Injectable } from "@nestjs/common";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Company } from "./entities/company.entity";
import { Repository } from "typeorm";

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>
  ) {
  }

  async create(createCompanyDto: CreateCompanyDto) {
    return await createCompanyDto
    return await this.companyRepository.save(createCompanyDto);
  }

  async findAll() {
    return await this.companyRepository.find();
    return `This action returns all company`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  async delete(id: number) {
    return `This action removes a #${id} company`;
  }
}
