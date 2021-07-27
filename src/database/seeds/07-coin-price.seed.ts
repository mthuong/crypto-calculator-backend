/* eslint-disable security/detect-non-literal-fs-filename */
import { cleanTable } from '@modules/common/utils/query';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Coin } from '@modules/coin/coin.entity';
import { safeKey } from '@modules/common/utils';
import { GetPriceResponse } from '@modules/price/dto/get-price.dto';
import { Price } from '@modules/price/price.entity';
// import fs from 'fs';

export default class CreateCoinPrice implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await cleanTable(connection, 'price');

    const coins = await connection.createQueryBuilder().select('coin').from(Coin, 'coin').getMany();

    const fs = require('fs');

    let fileIndex = 1;

    for (let index = 0; index < coins.length; index++) {
      const coin: Partial<Coin> = coins[safeKey(index)];

      fileIndex = 1;

      switch (coin.identify) {
        case 'tokocrypto':
          {
            let filePath = getFilePath(coin, fileIndex);

            let isFileExist = fs.existsSync(filePath);

            while (isFileExist) {
              // Load the file and insert to database
              const priceString = fs.readFileSync(filePath, 'utf-8');

              const prices: GetPriceResponse[] = JSON.parse(priceString);

              const data: Price[] = [];

              for (let index = 0; index < prices.length; index++) {
                const item = prices[safeKey(index)];

                const price = new Price(item.market_data.current_price, coin.id, item.date);

                data.push(price);
              }

              await connection.createQueryBuilder().insert().into('price').values(data).execute();

              fileIndex++;
              filePath = getFilePath(coin, fileIndex);
              isFileExist = fs.existsSync(filePath);
            }
          }

          break;

        default:
          break;
      }
    }
  }
}

function getFilePath(coin: Partial<Coin>, fileIndex: number): string {
  return `./src/database/seeds/data/${coin.identify}/${coin.identify}_${fileIndex}.json`;
}
