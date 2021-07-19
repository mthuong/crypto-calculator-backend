import { environment } from '@env/environment';
import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CoinModule } from './coin/coin.module';
import { PriceModule } from './price/price.module';

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
    TypeOrmModule.forRoot(),
  ]),
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
