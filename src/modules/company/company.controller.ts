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
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ICompanyService } from './interfaces/c.service';
import { IUserService } from '../user/interfaces/u.service';
import { ApiTags } from '@nestjs/swagger';
import { IFileService } from '../file/interfaces/f.service';
import { Auth } from 'src/common/decorator/auth.decorator';
import { RoleEnum } from 'src/common/enums/enum';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(
    @Inject('IUserService') private readonly userService: IUserService,
    @Inject('ICompanyService') private readonly companyService: ICompanyService,
    @Inject('IFileService') private readonly fileService: IFileService,
  ) {}

  @Auth(RoleEnum.ADMIN)
  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    const { data: foundUser } = await this.userService.findOneById(
      createCompanyDto.owner,
    );
    const { data: foundFile } = await this.fileService.findOne(
      createCompanyDto.logo,
    );
    return this.companyService.create(createCompanyDto, foundUser, foundFile);
  }

  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOneById(+id);
  }

  @Auth(RoleEnum.ADMIN, RoleEnum.OWNER)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Auth(RoleEnum.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
