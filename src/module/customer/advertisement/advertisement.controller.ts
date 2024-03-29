import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdvertisementService } from './advertisement.service';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';

@Controller('advertisement')
export class AdvertisementController {
  constructor(private readonly advertisementService: AdvertisementService) {}

  @Post()
  async create(@Body() createAdvertisementDto: CreateAdvertisementDto) {
    return await this.advertisementService.create(createAdvertisementDto);
  }

  @Get(':companyId')
  async findAll(@Param('companyId') companyId: string) {
    return this.advertisementService.findAll(companyId);
  }

  @Get(':id')
  async findByCategoryId(@Param('id') id: string) {
    return this.advertisementService.findByCategoryId(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.advertisementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdvertisementDto: UpdateAdvertisementDto) {
    return this.advertisementService.update(+id, updateAdvertisementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.advertisementService.remove(+id);
  }
}
