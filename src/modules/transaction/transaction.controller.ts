import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Auth } from 'src/common/decorator/auth.decorator';
import { RedisKeys, RoleEnum } from 'src/common/enums/enum';
import { CurrentUser } from 'src/common/decorator/CurrentUser.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Auth(RoleEnum.ADMIN, RoleEnum.CLIENT, RoleEnum.OWNER, RoleEnum.SUPERVISOR)
  @Post()
  createDebit(
    @Body() createTransactionDto: CreateTransactionDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    if (currentUser.role === "owner" || currentUser.role === "supervisor") {
      createTransactionDto.companyId = currentUser.company.id;
    }
    return this.transactionService.createDebit(createTransactionDto, currentUser);
  }
  @Post()
  createCredit(
    @Body() createTransactionDto: CreateTransactionDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return this.transactionService.create(createTransactionDto, currentUser);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey(RedisKeys.TRANSACTIONS)
  @CacheTTL(0)
  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @Get('/user/:id')
  async findOneByUserId(@Param('id') id: string) {
    return await this.transactionService.findOneByUserId(+id);
  }
  @Get('/product/:id')
  async findOneByProductId(@Param('id') id: string) {
    return await this.transactionService.findOneByProductId(+id);
  }

  // @Auth(RoleEnum.ADMIN, RoleEnum.BOSS, RoleEnum.WORKER)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return this.transactionService.update(
      +id,
      updateTransactionDto,
      currentUser,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
