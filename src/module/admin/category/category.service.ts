import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {
  }

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.save(createCategoryDto);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOne({where: {id}})
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const categoryToUpdate = await this.categoryRepository.findOne({ where: { id } });

    if (!categoryToUpdate) {
      throw new Error('Category not found');
    }

    categoryToUpdate.name = updateCategoryDto.name;
    categoryToUpdate.description = updateCategoryDto.description;

    return await this.categoryRepository.save(categoryToUpdate);
  }


  async remove(id: number) {
    return await this.categoryRepository.delete({id})
  }
}
