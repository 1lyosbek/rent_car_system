import { ID } from 'src/common/types/type';
import { CarEntity } from '../entities/car.entity';

export interface ICompanyRepository {
  getAll(): Promise<Array<CarEntity>>;
  getById(id: ID): Promise<CarEntity | undefined>;
  create(company: CarEntity): Promise<CarEntity>;
  update(company: CarEntity): Promise<CarEntity>;
  delete(id: ID): Promise<CarEntity>;
}
