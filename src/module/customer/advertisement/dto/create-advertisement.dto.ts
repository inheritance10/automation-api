import { IsNotEmpty, IsString, IsArray, IsNumber, IsDate } from "class-validator";

class MediaDto {
  @IsNotEmpty()
  @IsString()
  fileName: string;

  @IsNotEmpty()
  @IsString()
  filePath: string;

  @IsNotEmpty()
  @IsString()
  fileType: string;
}

export class CreateAdvertisementDto {
  @IsNotEmpty()
  @IsNumber()
  companyId: number;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDate()
  creationDate: Date;

  @IsArray()
  @IsNotEmpty()
  medias: MediaDto[];
}

