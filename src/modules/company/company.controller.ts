import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ICompanyService } from './interfaces/c.service';
import { IUserService } from '../user/interfaces/u.service';

@Controller('company')
export class CompanyController {
  constructor(
    @Inject("IUserService") private readonly userService: IUserService,
    @Inject("ICompanyService") private readonly companyService: ICompanyService
    ) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    const { data: foundUser } = await this.userService.findOneById(createCompanyDto.owner)
    return this.companyService.create(createCompanyDto, foundUser);
  }

  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
