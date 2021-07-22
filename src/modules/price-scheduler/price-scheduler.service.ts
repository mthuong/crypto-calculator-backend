import { Price } from '@modules/price/price.entity';
import { PriceService } from '@modules/price/price.service';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class PriceSchedulerService {
  constructor(private readonly priceService: PriceService) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM, {
    name: 'Get crypto price history',
    timeZone: 'UTC',
  })
  getPrice() {
    console.log('====================================');
    console.log('getPrice');
    console.log('====================================');
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  testGetPrice() {
    // TODO: Insert to queue
    // this.priceService.getPrice('bitcoin', new Date()).subscribe((response) => {
    //   const price = new Price(response.data.market_data.current_price);
    // });
  }
}
