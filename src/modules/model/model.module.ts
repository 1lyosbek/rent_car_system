import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from '../file/entities/file.entity';
import { SharedModule } from '../shared/shared.module';
import { ModelEntity } from './entities/model.entity';
import { ModelController } from './model.controller';
import { ModelService } from './model.service';
import { ModelRepository } from './model.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ModelEntity, FileEntity]), SharedModule],
  controllers: [ModelController],
  providers: [
    { provide: 'IModelService', useClass: ModelService },
    { provide: 'IModelRepository', useClass: ModelRepository },
  ],
})
export class ModelModule {}
