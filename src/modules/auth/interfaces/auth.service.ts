import { UserEntity } from 'src/modules/user/entities/user.entity';
import { ClientRegisterDto, LoginDto, RegisterDto } from '../dto/auth.dto';
import { ResData } from 'src/lib/resData';
import { FileEntity } from 'src/modules/file/entities/file.entity';
import { CompanyEntity } from 'src/modules/company/entities/company.entity';

export interface ILoginData {
  user: UserEntity;
  token: string;
}

export interface IAuthService {
  login(data: LoginDto): Promise<ResData<ILoginData>>;
  register(data: RegisterDto, foundFile: FileEntity, company: CompanyEntity): Promise<ResData<ILoginData>>;
  registerClient(dto: ClientRegisterDto, foundFile: FileEntity): Promise<ResData<ILoginData>>
}
