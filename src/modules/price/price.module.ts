import { PriceSchedulerModule } from '@modules/price-scheduler/price-scheduler.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceController } from './price.controller';
import { Price } from './price.entity';
import { PriceService } from './price.service';

@Module({
  imports: [TypeOrmModule.forFeature([Price]), HttpModule, PriceSchedulerModule],
  controllers: [PriceController],
  providers: [PriceService],
  exports: [PriceService],
})
export class PriceModule {}
