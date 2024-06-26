import {
  Controller,
  Get,
  Inject,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IUserService } from './interfaces/u.service';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { RedisKeys, RoleEnum } from 'src/common/enums/enum';
import { Auth } from 'src/common/decorator/auth.decorator';
import { ICompanyService } from '../company/interfaces/c.service';
import { CurrentUser } from "../../common/decorator/CurrentUser.decorator";
import { UserEntity } from "./entities/user.entity";

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    @Inject('IUserService') private readonly userService: IUserService,
    @Inject('ICompanyService') private readonly companyService: ICompanyService,
  ) {}

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.SUPERVISOR)
  @UseInterceptors(CacheInterceptor)
  @CacheKey(RedisKeys.USERS)
  @CacheTTL(0)
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER, RoleEnum.SUPERVISOR)
  @UseInterceptors(CacheInterceptor)
  @CacheKey(RedisKeys.CLIENTS)
  @CacheTTL(0)
  @Get('clients')
  async getClients() {
    return this.userService.findAllClients();
  }

  @Get('/:id')
  findOneById(@Param('id') id: string) {
    return this.userService.findOneById(+id);
  }

}
