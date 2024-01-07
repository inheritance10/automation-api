import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserService } from "../user/user.service";
import { User } from "../user/entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { Company } from "../admin/company/entities/company.entity";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Company]),
    PassportModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}` ,
      signOptions: { expiresIn: '60s' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy,JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
