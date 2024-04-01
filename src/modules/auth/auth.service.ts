import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAuthService, ILoginData } from './interfaces/auth.service';
import { ResData } from 'src/lib/resData';
import { ClientRegisterDto, LoginDto, RegisterDto } from './dto/auth.dto';
import { PhoneExistException, PhoneIsWrongException } from './exception/auth.exception';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { UserRepository } from '../user/user.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { RedisKeys, RoleEnum } from 'src/common/enums/enum';
import { FileEntity } from '../file/entities/file.entity';
import { CompanyEntity } from '../company/entities/company.entity';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject("IUserService") private readonly userService: UserService,
    @Inject("IUserRepository") private readonly userRepository: UserRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<ResData<ILoginData>> {
    const { data: foundUser } = await this.userService.findOneByPhone(
      dto.phone,
    );

    if (!foundUser) {
      throw new PhoneIsWrongException();
    }

    const token = await this.jwtService.signAsync({ id: foundUser.id });

    return new ResData<ILoginData>('success', HttpStatus.OK, {
      user: foundUser,
      token,
    });
  }

  async registerClient(dto: ClientRegisterDto, foundFile: FileEntity): Promise<ResData<ILoginData>> {
    const { data: foundUser } = await this.userService.findOneByPhone(
      dto.phone,
    );

    if (foundUser) {
      throw new PhoneExistException();
    } 
    
    const newUser = new UserEntity();
    newUser.phone = dto.phone;
    newUser.fullName = dto.fullName;
    newUser.avatar = foundFile;
    newUser.role =  RoleEnum.CLIENT;

    const savedUser = await this.userRepository.createUser(newUser);

    await this.cacheManager.del(RedisKeys.USERS)
    const token = await this.jwtService.signAsync({ id: savedUser.id });

    return new ResData<ILoginData>('success', HttpStatus.OK, {
      user: savedUser,
      token,
    });
  
}

  async register(dto: RegisterDto, foundFile: FileEntity, foundCompany: CompanyEntity): Promise<ResData<ILoginData>> {    
    const newUser = new UserEntity();
    newUser.phone = dto.phone;
    newUser.fullName = dto.fullName;
    newUser.avatar = foundFile;
    newUser.role =  dto.role;
    newUser.company = foundCompany;

    const savedUser = await this.userRepository.createUser(newUser);

    await this.cacheManager.del(RedisKeys.USERS)
    const token = await this.jwtService.signAsync({ id: savedUser.id });

    return new ResData<ILoginData>('success', HttpStatus.OK, {
      user: savedUser,
      token,
    });
  
}
}
