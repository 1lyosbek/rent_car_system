import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransactionRespository } from './transaction.repository';
import { TransactionEntity } from './entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { CarService } from '../car/car.service';
import { CarRepository } from '../car/car.repository';
import { CompanyService } from '../company/company.service';
import { CompanyRepository } from '../company/company.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity]), SharedModule],
  controllers: [TransactionController],
  providers: [
  TransactionService, TransactionRespository,
  { provide: 'ICompanyService', useClass: CompanyService },
  { provide: 'ICompanyRepository', useClass: CompanyRepository },
  { provide: 'ICarService', useClass: CarService },
  { provide: 'ICarRepository', useClass: CarRepository },
],
})
export class TransactionModule {}
