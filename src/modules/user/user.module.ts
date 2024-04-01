import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CompanyService } from '../company/company.service';
import { CompanyRepository } from '../company/company.repository';
import { CompanyEntity } from "../company/entities/company.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, CompanyEntity])],
  controllers: [UserController],
  providers: [
    { provide: 'IUserService', useClass: UserService },
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'ICompanyService', useClass: CompanyService },
    { provide: 'ICompanyRepository', useClass: CompanyRepository },
  ],
})
export class UserModule {}
