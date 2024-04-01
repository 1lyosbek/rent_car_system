import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyEntity } from './entities/company.entity';
import { ResData } from 'src/lib/resData';
import { UserEntity } from '../user/entities/user.entity';
import { ICompanyService } from './interfaces/c.service';
import { IUserService } from '../user/interfaces/u.service';
import { ICompanyRepository } from './interfaces/c.repository';
import { CompanyNotFoundException } from "./exceptions/company.exceptions";

@Injectable()
export class CompanyService implements ICompanyService {
  constructor(
    @Inject('ICompanyRepository')
    private readonly repository: ICompanyRepository,
    @Inject('IUserService') private readonly userService: IUserService,
  ) {}
  async create(
    createCompanyDto: CreateCompanyDto,
    foundOwner: UserEntity,
  ): Promise<ResData<CompanyEntity>> {
    const newCompany = new CompanyEntity();
    newCompany.name = createCompanyDto.name;
    newCompany.owner = foundOwner;
    newCompany.logo = createCompanyDto.logo;

    return new ResData(
      'Success',
      HttpStatus.CREATED,
      await this.repository.create(newCompany),
    );
  }

  async findAll(): Promise<ResData<Array<CompanyEntity>>> {
    const allCompanies = await this.repository.getAll();
    return new ResData('Success', HttpStatus.OK, allCompanies);
  }

  async findOneById(id: number) {
    const foundCompany = await this.repository.getById(id);
    if (!foundCompany) {
      throw new CompanyNotFoundException(id);
    }
    return new ResData('Success', HttpStatus.OK, foundCompany);
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const { data: foundCompany } = await this.findOneById(id);
    const update = Object.assign(foundCompany, updateCompanyDto);
    const updatedCompany = await this.repository.update(update);
    return new ResData('Success', HttpStatus.OK, updatedCompany);
  }

  async remove(id: number): Promise<ResData<CompanyEntity>> {
    await this.findOneById(id);
    const deletedCompany = await this.repository.delete(id);
    return new ResData('Success', HttpStatus.OK, deletedCompany);
  }
}
