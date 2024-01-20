import { Injectable } from "@nestjs/common";
import { CreateAdvertisementDto } from "./dto/create-advertisement.dto";
import { UpdateAdvertisementDto } from "./dto/update-advertisement.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Advertisement } from "./entities/advertisement.entity";
import { File } from "../../../file/entities/file.entity";

@Injectable()
export class AdvertisementService {

  constructor(
    @InjectRepository(Advertisement)
    private advertisementRepository: Repository<Advertisement>,
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>
  ) {
  }

  async create(createAdvertisementDto: CreateAdvertisementDto) {
    const { title, description, categoryId, medias,companyId } = createAdvertisementDto;

    const advertisement = this.advertisementRepository.create({
      title,
      description,
      categoryId,
      companyId,
      creationDate: new Date()
    });
    const createdAdvertisement: any = await this.advertisementRepository.save(advertisement);

    const createdMedias: File[] = [];
    for (const media of medias) {
      const createdMedia: any = await this.createMedia(media, createdAdvertisement.id);
      createdMedias.push(createdMedia);
    }

    return { advertisement: createdAdvertisement, medias: createdMedias };
  }

  async createMedia(media: any, advertisementId: number) {
    const { fileName, filePath, fileType } = media;

    const file = this.fileRepository.create({
      fileName,
      filePath,
      fileType,
      advertisementId
    });
    return await this.fileRepository.save(file);
  }

  async findAll(companyId: any) {
    return await this.advertisementRepository.find({
      relations: ['offers', 'files','category'],
      where: { companyId: companyId }
    });
  }

  async findOne(id: number) {
    return await this.advertisementRepository.findOne({
      relations: ['offers', 'files','category'],
      where: { id: id }
    });
  }

  async findByCategoryId(categoryId: any) {
    return await this.advertisementRepository.find({ where: { categoryId: categoryId } });
  }

  async update(id: number, updateAdvertisementDto: UpdateAdvertisementDto) {
    return `This action updates a #${id} advertisement`;
  }

  async remove(id: number) {
    return `This action removes a #${id} advertisement`;
  }
}
