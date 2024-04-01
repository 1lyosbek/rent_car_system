import { UserEntity } from 'src/modules/user/entities/user.entity';
import { LoginDto, RegisterDto } from '../dto/auth.dto';
import { ResData } from 'src/lib/resData';
import { FileEntity } from 'src/modules/file/entities/file.entity';

export interface ILoginData {
  user: UserEntity;
  token: string;
}

export interface IAuthService {
  login(data: LoginDto): Promise<ResData<ILoginData>>;
  register(data: RegisterDto, foundFile: FileEntity): Promise<ResData<ILoginData>>;
}
