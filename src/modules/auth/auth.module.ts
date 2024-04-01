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
    TypeOrmModule.forFeature(([FileEntity, CompanyEntity])),
    JwtModule.register({
      global: true,
      secret: 'ok',
      signOptions: { expiresIn: '1d' },
    }),
    SharedModule, 
  ],
  controllers: [AuthController],
  providers: [AuthService, 
    {provide: "IFileService", useClass: FileService},
    {provide:"IFileRepository", useClass: FileRepository},
    { provide: "ICompanyService", useClass: CompanyService },
    { provide: "ICompanyRepository", useClass: CompanyRepository },
  ],
})
export class AuthModule {}
