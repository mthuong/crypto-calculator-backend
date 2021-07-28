import { Coin } from '@modules/coin/coin.entity';
import { CoinModule } from '@modules/coin/coin.module';
import { Price } from '@modules/price/price.entity';
import { PriceModule } from '@modules/price/price.module';
import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceSchedulerService } from './price-scheduler.service';

@Module({
  imports: [TypeOrmModule.forFeature([Price, Coin]), HttpModule, forwardRef(() => PriceModule), CoinModule],
  providers: [PriceSchedulerService],
  exports: [PriceSchedulerService],
})
export class PriceSchedulerModule {}
