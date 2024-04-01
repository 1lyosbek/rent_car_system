import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from '../shared/shared.module';
import { FileService } from '../file/file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from '../file/entities/file.entity';
import { FileRepository } from '../file/file.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature(([FileEntity])),
    JwtModule.register({
      global: true,
      secret: 'ok',
      signOptions: { expiresIn: '1d' },
    }),
    SharedModule, 
  ],
  controllers: [AuthController],
  providers: [AuthService, {provide: "IFileService", useClass: FileService}, {provide:"IFileRepository", useClass: FileRepository}],
})
export class AuthModule {}
