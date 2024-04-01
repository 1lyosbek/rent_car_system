import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ApiTags } from '@nestjs/swagger';
import { ICompanyService } from '../company/interfaces/c.service';
import { IModelService } from '../model/interfaces/model.service';
import { ICarService } from './interfaces/car.service';

@ApiTags('Car')
@Controller('car')
export class CarController {
  constructor(
    @Inject('ICarService') private readonly carService: ICarService,
    @Inject('ICompanyService') private readonly companyService: ICompanyService,
    @Inject('IModelService') private readonly modelService: IModelService,
  ) {}

  @Post()
  async create(@Body() createCarDto: CreateCarDto) {
    const { data: foundModel } = await this.modelService.findOneById(
      createCarDto.model_id,
    );
    const { data: foundCompany } = await this.companyService.findOneById(
      createCarDto.company_id,
    );
    return this.carService.create(createCarDto, foundModel, foundCompany);
  }

  @Get()
  findAll() {
    return this.carService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(+id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carService.remove(+id);
  }
}
