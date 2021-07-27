/* eslint-disable max-depth */
import { CoinService } from '@modules/coin/coin.service';
import { delay } from '@modules/common/utils/functions';
import { Price } from '@modules/price/price.entity';
import { PriceService } from '@modules/price/price.service';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { addDays, isFuture } from 'date-fns';

@Injectable()
export class PriceSchedulerService {
  constructor(private readonly priceService: PriceService, private readonly coinService: CoinService) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM, {
    name: 'Get crypto price history',
    timeZone: 'UTC',
  })
  async getPrice() {
    console.log('====================================');
    console.log('getPrice');
    console.log('====================================');

    await this.getNewPrice();
  }

  async getNewPrice() {
    const [coins] = await this.coinService.findAll();

    for (const coin of coins) {
      const lastDate = await this.priceService.findLastDate();

      if (lastDate) {
        // Get price for next date
        let nextDate = addDays(lastDate, 1);

        while (!isFuture(nextDate)) {
          const response = await this.priceService.getPrice(coin.identify, nextDate);

          if (response.status === 200 && response.data.market_data?.current_price) {
            const price = new Price(response.data.market_data.current_price, coin.id, nextDate);

            // eslint-disable-next-line @typescript-eslint/await-thenable
            await this.priceService.create({
              price,
            });

            await delay(900);

            nextDate = addDays(nextDate, 1);
          } else {
            // There are no new data for current coin or got error
            break;
          }
        }
      }
    }
  }
}
