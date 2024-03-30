import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './modules/user/entities/user.entity';
import { Category } from './modules/category/entities/category.entity';
import { ProductEntity } from './modules/product/entities/product.entity';
import { TransactionEntity } from './modules/transaction/entities/transaction.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { FileModule } from './modules/file/file.module';
import { FileEntity } from './modules/file/entities/file.entity';
import { config } from './common/config/config';
import { CompanyModule } from './modules/company/company.module';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          socket: { host: config.redis_host, port: config.redis_port},
          ttl: 10 * 1000,
        });
        return { store }
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.database_host,
      port: config.database_port,
      username: config.database_user,
      password: config.database_password,
      database: config.database,
      entities: [UserEntity, Category, ProductEntity, TransactionEntity, FileEntity],
      synchronize: true,
    }),
    AuthModule,
    CategoryModule,
    ProductModule,
    TransactionModule,
    UserModule,
    FileModule,
    CompanyModule,
  ],
})
export class AppModule { }