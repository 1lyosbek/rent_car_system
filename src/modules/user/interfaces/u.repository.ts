import { ID } from 'src/common/types/type';
import { UserEntity } from '../entities/user.entity';
import { CompanyEntity } from '../../company/entities/company.entity';

export interface IUserRepository {
  findOneById(id: ID): Promise<UserEntity | undefined>;
  findByPhone(phone: number): Promise<UserEntity | undefined>;
  findAllUsers(): Promise<UserEntity[]>;
  createUser(user: UserEntity): Promise<UserEntity>;
  findAllClients(): Promise<UserEntity[]>;
}
