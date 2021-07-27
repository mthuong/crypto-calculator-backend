import { Module } from '@nestjs/common';
import { CoinService } from './coin.service';
import { CoinController } from './coin.controller';
import { Coin } from './coin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Coin])],
  controllers: [CoinController],
  providers: [CoinService],
  exports: [TypeOrmModule, CoinService],
})
export class CoinModule {}
