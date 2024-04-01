import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity } from './entities/company.entity';
import { ICompanyRepository } from './interfaces/c.repository';
import { ID } from 'src/common/types/type';

export class CompanyRepository implements ICompanyRepository {
  constructor(
    @InjectRepository(CompanyEntity)
    private repository: Repository<CompanyEntity>,
  ) {}
  async create(company: CompanyEntity): Promise<CompanyEntity> {
    return await this.repository.save(company);
  }
  async getById(id: ID): Promise<CompanyEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }
  async getAll(): Promise<CompanyEntity[]> {
    return await this.repository.find();
  }
  async update(entity: CompanyEntity): Promise<CompanyEntity> {
    return await this.repository.save(entity);
  }
  async delete(id: ID): Promise<CompanyEntity | undefined> {
    const foundCompany = await this.repository.findOneBy({ id });
    await this.repository.delete(id);
    return foundCompany;
  }
}
