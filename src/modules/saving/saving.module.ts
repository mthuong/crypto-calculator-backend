import { CoinModule } from '@modules/coin/coin.module';
import { CoinService } from '@modules/coin/coin.service';
import { DoesCoinExistById } from '@modules/coin/validators';
import { Price } from '@modules/price/price.entity';
import { PriceModule } from '@modules/price/price.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavingController } from './saving.controller';
import { SavingService } from './saving.service';

@Module({
  imports: [CoinModule, PriceModule, TypeOrmModule.forFeature([Price])],
  providers: [CoinService, SavingService, DoesCoinExistById],
  controllers: [SavingController],
  exports: [],
})
export class SavingModule {}
