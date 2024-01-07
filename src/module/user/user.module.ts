import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Company } from "../admin/company/entities/company.entity";
import { User } from "./entities/user.entity";

@Module({
  imports:[TypeOrmModule.forFeature([User, Company])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
