import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  Put,
} from '@nestjs/common';
import { ModelService } from './model.service';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { ApiTags } from '@nestjs/swagger';
import { ICompanyService } from '../company/interfaces/c.service';
import { Auth } from 'src/common/decorator/auth.decorator';
import { RoleEnum } from 'src/common/enums/enum';

@ApiTags('Model')
@Controller('model')
export class ModelController {
  constructor(
    @Inject('IModelService') private readonly modelService: ModelService,
  ) {}

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER)
  @Post()
  create(@Body() createModelDto: CreateModelDto) {
    return this.modelService.create(createModelDto);
  }

  @Get()
  findAll() {
    return this.modelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modelService.findOneById(+id);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateModelDto: UpdateModelDto) {
    return this.modelService.update(+id, updateModelDto);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modelService.remove(+id);
  }
}
