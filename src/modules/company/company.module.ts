import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './entities/company.entity';
import { FileEntity } from '../file/entities/file.entity';
import { CompanyRepository } from './company.repository';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyEntity, FileEntity
    ]), SharedModule],
  controllers: [CompanyController],
  providers: [
   {provide: "ICompanyService", useClass: CompanyService},
   {provide: "ICompanyRepository", useClass: CompanyRepository},
  ],
})
export class CompanyModule {}
