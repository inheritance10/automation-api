import { Module } from '@nestjs/common';
import { AdvertisementService } from './advertisement.service';
import { AdvertisementController } from './advertisement.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Advertisement } from "./entities/advertisement.entity";
import { File } from "../../../file/entities/file.entity";

@Module({
  imports: [
     TypeOrmModule.forFeature([Advertisement, File])
  ],
  controllers: [AdvertisementController],
  providers: [AdvertisementService],
})
export class AdvertisementModule {}
