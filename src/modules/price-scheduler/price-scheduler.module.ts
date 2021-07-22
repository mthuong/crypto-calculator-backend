import { PriceModule } from '@modules/price/price.module';
import { PriceService } from '@modules/price/price.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PriceSchedulerService } from './price-scheduler.service';

@Module({
  imports: [HttpModule, PriceModule],
  providers: [PriceService, PriceSchedulerService],
})
export class PriceSchedulerModule {}
