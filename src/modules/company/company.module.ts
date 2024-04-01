import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './entities/company.entity';
import { FileEntity } from '../file/entities/file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyEntity, FileEntity
    ])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
