import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { FileRepository } from './file.repository';
import { FileEntity } from './entities/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from '../car/entities/car.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FileEntity, CarEntity
    ])],
  controllers: [FileController],
  providers: [
   {provide: "IFileService", useClass: FileService},
   {provide: "IFileRepository", useClass: FileRepository}
  ],
})
export class FileModule {}
