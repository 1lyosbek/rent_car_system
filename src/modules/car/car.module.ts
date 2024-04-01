import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { CarEntity } from './entities/car.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from '../file/entities/file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ CarEntity, FileEntity ])],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}

