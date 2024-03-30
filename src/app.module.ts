import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './modules/user/entities/user.entity';
import { TransactionEntity } from './modules/transaction/entities/transaction.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { FileModule } from './modules/file/file.module';
import { FileEntity } from './modules/file/entities/file.entity';
import { config } from './common/config/config';
import { CompanyModule } from './modules/company/company.module';
import { CarModule } from './modules/car/car.module';
import { ModelModule } from './modules/model/model.module';

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
      entities: [UserEntity,TransactionEntity, FileEntity],
      synchronize: true,
    }),
    AuthModule,
    TransactionModule,
    UserModule,
    FileModule,
    CompanyModule,
    CarModule,
    ModelModule,
  ],
})
export class AppModule { }