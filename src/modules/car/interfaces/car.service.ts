import { ResData } from 'src/lib/resData';
import { CreateCarDto } from '../dto/create-car.dto';
import { UpdateCarDto } from '../dto/update-car.dto';
import { CarEntity } from '../entities/car.entity';
import { ID } from 'src/common/types/type';
import { CompanyEntity } from '../../company/entities/company.entity';
import { ModelEntity } from "../../model/entities/model.entity";

export interface ICarService {
  findAll(): Promise<ResData<CarEntity[]>>;
  findOneById(id: ID): Promise<ResData<CarEntity>>;
  create(
    car: CreateCarDto,
    model: ModelEntity,
    company: CompanyEntity,
  ): Promise<ResData<CarEntity>>;
  update(id: ID, company: UpdateCarDto): Promise<ResData<CarEntity>>;
  remove(id: ID): Promise<ResData<CarEntity>>;
}
