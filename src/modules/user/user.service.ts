import { Inject, Injectable } from '@nestjs/common';
import { ID } from 'src/common/types/type';
import { UserNotFoundException } from './exception/user.exception';
import { ResData } from 'src/lib/resData';
import { IUserRepository } from './interfaces/u.repository';
import { IUserService } from './interfaces/u.service';
import { UserEntity } from './entities/user.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { RedisKeys } from 'src/common/enums/enum';
import { CompanyEntity } from "../company/entities/company.entity";

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository') private readonly repository: IUserRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(): Promise<ResData<UserEntity[]>> {
    const foundUsers = await this.repository.findAllUsers();
    return new ResData<UserEntity[]>('users', 200, foundUsers);
  }

  async findOneById(id: ID): Promise<ResData<UserEntity>> {
    const foundData = await this.cacheManager.get(
      RedisKeys.USER_BY_ID + ':' + id,
    );

    if (foundData) {
      return new ResData<any>('success', 200, foundData);
    }

    await this.cacheManager.set(RedisKeys.USER_BY_ID + ':' + id, id);

    const foundUser = await this.repository.findOneById(id);
    if (!foundUser) {
      throw new UserNotFoundException();
    }

    console.log(foundUser.company);

    return new ResData('success', 200, foundUser);
  }

  async findOneByPhone(phone: number): Promise<ResData<UserEntity>> {
    const foundData = await this.repository.findByPhone(phone);

    const resData = new ResData('success', 200, foundData);

    if (!foundData) {
      resData.message = 'Not Found';
      resData.statusCode = 404;
    }

    return resData;
  }

  async findAllClients(): Promise<ResData<UserEntity[]>> {
    const foundData = await this.repository.findAllClients();
    return new ResData('success', 200, foundData);
  }
}
