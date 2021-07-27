import { environment } from '@env/environment';
import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoinModule } from './coin/coin.module';
import { PriceModule } from './price/price.module';
import { UsersModule } from './users/users.module';
import { PriceSchedulerModule } from './price-scheduler/price-scheduler.module';
import { SavingController } from './saving/saving.controller';
import { SavingService } from './saving/saving.service';
import { SavingModule } from './saving/saving.module';

type ImportModule =
  | Type<any>
  | DynamicModule
  | Promise<DynamicModule>
  | ForwardReference;
const serveStaticModule: ImportModule[] = environment.aws.isEnabled
  ? []
  : [
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', environment.static.name),
      }),
    ];

@Module({
  imports: serveStaticModule.concat([
    AuthModule,
    UsersModule,
    CoinModule,
    PriceModule,
    PriceSchedulerModule,
    SavingModule,
    TypeOrmModule.forRoot(),
    ScheduleModule.forRoot(),
  ]),
  controllers: [AppController, SavingController],
  providers: [AppService, SavingService],
})
export class AppModule {}
