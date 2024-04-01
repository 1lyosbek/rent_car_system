import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from '../shared/shared.module';
import { FileService } from '../file/file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from '../file/entities/file.entity';
import { FileRepository } from '../file/file.repository';
import { CompanyService } from '../company/company.service';
import { CompanyRepository } from '../company/company.repository';
import { CompanyEntity } from '../company/entities/company.entity';

@Module({
  imports: [
<<<<<<< HEAD
    TypeOrmModule.forFeature([FileEntity]),
=======
    TypeOrmModule.forFeature(([FileEntity, CompanyEntity])),
>>>>>>> d72e683be1bb8453f70a7a06d8b9687730861309
    JwtModule.register({
      global: true,
      secret: 'ok',
      signOptions: { expiresIn: '1d' },
    }),
    SharedModule,
  ],
  controllers: [AuthController],
<<<<<<< HEAD
  providers: [
    AuthService,
    { provide: 'IFileService', useClass: FileService },
    { provide: 'IFileRepository', useClass: FileRepository },
=======
  providers: [AuthService, 
    {provide: "IFileService", useClass: FileService},
    {provide:"IFileRepository", useClass: FileRepository},
    { provide: "ICompanyService", useClass: CompanyService },
    { provide: "ICompanyRepository", useClass: CompanyRepository },
>>>>>>> d72e683be1bb8453f70a7a06d8b9687730861309
  ],
})
export class AuthModule {}
