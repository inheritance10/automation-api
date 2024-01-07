import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from "@nestjs/config";
import { CompanyModule } from './module/admin/company/company.module';
import { UserModule } from './module/user/user.module';
import { CategoryModule } from './module/admin/category/category.module';
import { AdvertisementModule } from './module/customer/advertisement/advertisement.module';
import { OfferModule } from './module/customer/offer/offer.module';
import { FileModule } from './file/file.module';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule,
    CompanyModule,
    UserModule,
    CategoryModule,
    AdvertisementModule,
    OfferModule,
    FileModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
