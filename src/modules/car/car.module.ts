import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { CarEntity } from './entities/car.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from '../file/entities/file.entity';
import { CarRepository } from './car.repository';
import { CompanyService } from '../company/company.service';
import { CompanyRepository } from '../company/company.repository';
import { SharedModule } from '../shared/shared.module';
import { CompanyEntity } from '../company/entities/company.entity';
import { ModelService } from '../model/model.service';
import { ModelRepository } from '../model/model.repository';
import { ModelEntity } from '../model/entities/model.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CarEntity,
      FileEntity,
      CompanyEntity,
      ModelEntity,
    ]),
    SharedModule,
  ],
  controllers: [CarController],
  providers: [
    { provide: 'ICarService', useClass: CarService },
    { provide: 'ICarRepository', useClass: CarRepository },
    { provide: 'ICompanyService', useClass: CompanyService },
    { provide: 'ICompanyRepository', useClass: CompanyRepository },
    { provide: 'IModelService', useClass: ModelService },
    { provide: 'IModelRepository', useClass: ModelRepository },
  ],
})
export class CarModule {}
