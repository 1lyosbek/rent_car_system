import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { PhoneExistException } from './exception/auth.exception';
import { UserService } from '../user/user.service';
import { FileService } from '../file/file.service';
import { CurrentUser } from 'src/common/decorator/CurrentUser.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { Auth } from 'src/common/decorator/auth.decorator';
import { RoleEnum } from 'src/common/enums/enum';
import { ICompanyService } from '../company/interfaces/c.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('ICompanyService') private readonly companyService: ICompanyService,
    @Inject('IUserService') private readonly userService: UserService,
    @Inject('IFileService') private readonly fileService: FileService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('register-client')
  async registerClient(@Body() createDto: RegisterDto) {
    const { data: foundUser } = await this.userService.findOneByPhone(
      createDto.phone,
    );

    if (foundUser) {
      throw new PhoneExistException();
    }

    const { data: foundAvatar } = await this.fileService.findOne(
      createDto.avatar,
    );

    return await this.authService.registerClient(createDto, foundAvatar);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER)
  @Post('register')
  async register(
    @Body() createDto: RegisterDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    const { data: foundUser } = await this.userService.findOneByPhone(
      createDto.phone,
    );

    if (foundUser) {
      throw new PhoneExistException();
    }

    console.log('current :', currentUser);
    console.log(55);
    const { data: foundCompany } = await this.companyService.findOneById(
      createDto.companyId,
    );
    console.log(1);
    if (currentUser.role === 'owner') {
      createDto.companyId = currentUser.company.id;
    }



    const { data: foundAvatar } = await this.fileService.findOne(
      createDto.avatar,
    );

    return await this.authService.register(
      createDto,
      foundAvatar,
      foundCompany,
    );
  }
}
