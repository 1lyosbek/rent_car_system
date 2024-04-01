import { ID } from 'src/common/types/type';
import { CompanyEntity } from '../entities/company.entity';

export interface ICompanyRepository {
  getAll(): Promise<Array<CompanyEntity>>;
  getById(id: ID): Promise<CompanyEntity | undefined>;
  create(company: CompanyEntity): Promise<CompanyEntity>;
  update(company: CompanyEntity): Promise<CompanyEntity>;
  delete(id: ID): Promise<CompanyEntity>;
}
