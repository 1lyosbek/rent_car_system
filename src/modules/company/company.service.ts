import { Inject, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyEntity } from './entities/company.entity';
import { ResData } from 'src/lib/resData';
import { UserEntity } from '../user/entities/user.entity';
import { ICompanyService } from './interfaces/c.service';
import { IUserService } from '../user/interfaces/u.service';
import { ICompanyRepository } from './interfaces/c.repository';

@Injectable()
export class CompanyService implements ICompanyService {
  constructor(
    @Inject("ICompanyRepository") private readonly repository: ICompanyRepository,
    @Inject("IUserService") private readonly userService: IUserService
    ) {}
  async create(createCompanyDto: CreateCompanyDto, foundOwner: UserEntity):Promise<ResData<CompanyEntity>> {
    const newCompany = new CompanyEntity();
    newCompany.name = createCompanyDto.name;
    newCompany.owner = foundOwner;
    newCompany.logo = createCompanyDto.logo;
    return 'This action adds a new company';
  }

  findAll() {
    return `This action returns all company`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
