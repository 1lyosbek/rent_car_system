import { ID } from 'src/common/types/type';
import { UserEntity } from '../entities/user.entity';
import { ResData } from 'src/lib/resData';
import { CompanyEntity } from '../../company/entities/company.entity';

export interface IUserService {
  findAll(): Promise<ResData<UserEntity[]>>;
  findOneById(id: ID): Promise<ResData<UserEntity | undefined>>;
  findOneByPhone(phone: number): Promise<ResData<UserEntity | undefined>>;
  findAllClients(): Promise<ResData<UserEntity[]>>;
}
