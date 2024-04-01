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

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('IUserService') private readonly userService: UserService,
    @Inject('IFileService') private readonly fileService: FileService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
  @Post('register-client')
  async register(@Body() createDto: RegisterDto) {
    const { data: foundUser } = await this.userService.findOneByPhone(
      createDto.phone,
    );

    if (foundUser) {
      throw new PhoneExistException();
    }
    const { data: foundAvatar } = await this.fileService.findOne(
      createDto.avatar,
    );

    return await this.authService.register(createDto, foundAvatar);
  }
}
