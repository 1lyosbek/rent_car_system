import { ResData } from 'src/lib/resData';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { CompanyEntity } from '../entities/company.entity';
import { ID } from 'src/common/types/type';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { FileEntity } from "../../file/entities/file.entity";

export interface ICompanyService {
  findAll(): Promise<ResData<CompanyEntity[]>>;
  findOneById(id: ID): Promise<ResData<CompanyEntity>>;
  create(
    company: CreateCompanyDto,
    owner: UserEntity,
    file: FileEntity,
  ): Promise<ResData<CompanyEntity>>;
  update(id: ID, company: UpdateCompanyDto): Promise<ResData<CompanyEntity>>;
  remove(id: ID): Promise<ResData<CompanyEntity>>;
}
