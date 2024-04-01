import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ID } from 'src/common/types/type';
import { IUserRepository } from './interfaces/u.repository';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
  ) {}

  async findOneById(id: ID): Promise<UserEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }

  async findByPhone(phone: number): Promise<UserEntity | undefined> {
    return await this.repository.findOneBy({ phone });
  }
  
  async findAllUsers(): Promise<UserEntity[]> {
    return await this.repository.find();
  }

  async createUser(user: UserEntity): Promise<UserEntity> {
    return await this.repository.save(user);
  }
}
