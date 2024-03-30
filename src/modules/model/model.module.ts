import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';

@Module({
  controllers: [ModelController],
  providers: [ModelService],
})
export class ModelModule {}
