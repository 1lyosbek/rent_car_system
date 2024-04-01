import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarEntity } from './entities/car.entity';
import { ResData } from 'src/lib/resData';
import { ICarService } from './interfaces/car.service';
import { ICarRepository } from './interfaces/car.repository';
import { CarNotFoundException } from './exceptions/car.exception';
import { CompanyEntity } from '../company/entities/company.entity';
import { ModelEntity } from '../model/entities/model.entity';

@Injectable()
export class CarService implements ICarService {
  constructor(
    @Inject('ICarRepository') private readonly repository: ICarRepository,
  ) {}
  async create(
    createCarDto: CreateCarDto,
    model: ModelEntity,
    company: CompanyEntity,
  ): Promise<ResData<CarEntity>> {
    const newCar = new CarEntity();
    newCar.name = createCarDto.name;
    newCar.model = model;
    newCar.company = company;
    newCar.info = createCarDto.info;
    newCar.price = createCarDto.price;

    return new ResData(
      'Success',
      HttpStatus.CREATED,
      await this.repository.create(newCar),
    );
  }

  async findAll(): Promise<ResData<Array<CarEntity>>> {
    const allCompanies = await this.repository.getAll();
    return new ResData('Success', HttpStatus.OK, allCompanies);
  }

  async findOneById(id: number) {
    const foundCar = await this.repository.getById(id);
    if (!foundCar) {
      throw new CarNotFoundException(id);
    }
    return new ResData('Success', HttpStatus.OK, foundCar);
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    const { data: foundCar } = await this.findOneById(id);
    const update = Object.assign(foundCar, updateCarDto);
    const updatedCar = await this.repository.update(update);
    return new ResData('Success', HttpStatus.OK, updatedCar);
  }

  async remove(id: number): Promise<ResData<CarEntity>> {
    await this.findOneById(id);
    const deletedCar = await this.repository.delete(id);
    return new ResData('Success', HttpStatus.OK, deletedCar);
  }
}
