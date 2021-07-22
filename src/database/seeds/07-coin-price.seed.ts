/* eslint-disable max-depth */
/* eslint-disable security/detect-non-literal-fs-filename */
import { Coin } from '@modules/coin/coin.entity';
import { cleanTable } from '@modules/common/utils/query';
import { GetPriceResponse } from '@modules/price/dto/get-price.dto';
import { Price } from '@modules/price/price.entity';
import axios from 'axios';
import { add, format, formatISO, isBefore } from 'date-fns';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { coins } from './data';

const prices: Price[] = [];

export default class CreateCoinPrice implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await cleanTable(connection, 'price');

    await getHistoryData();
    await connection.createQueryBuilder().insert().into('price').values(prices).execute();
  }
}

async function getHistoryData() {
  const fs = require('fs');

  for (let index = 0; index < coins.length; index++) {
    // eslint-disable-next-line security/detect-object-injection
    const coin = coins[index];

    if (coin.identify !== 'bitcoin') {
      continue;
    }

    let fileIndex = 1;
    let fileName = createFileName(coin, fileIndex);

    let fileDescriptor = fs.openSync(fileName, 'w');

    let users = [];

    let icoDate = new Date(coin.icoDate);
    const today = new Date();

    while (isBefore(icoDate, today)) {
      try {
        const response = await axios.get<GetPriceResponse>(
          `https://api.coingecko.com/api/v3/coins/${coin.identify}/history?date=${format(icoDate, 'dd-MM-yyyy')}&localization=false`,
        );

        if (response.status === 200) {
          response.data.date = icoDate;
          users.push(response.data);

          if (users.length === 365) {
            fs.appendFileSync(fileName, JSON.stringify(users), 'utf-8');
            fs.closeSync(fileDescriptor);
            fileIndex++;

            fileName = createFileName(coin, fileIndex);

            fileDescriptor = fs.openSync(fileName, 'w');

            users = [];
          }
        }
      } catch (error) {
        console.log(error);
        await delay(3 * 60 * 1000);
        continue;
      }

      await delay(900);

      icoDate = add(icoDate, { days: 1 });

      console.log(`\n${formatISO(new Date())} - ${formatISO(icoDate)}`);
    }

    if (users.length > 0) {
      fs.appendFileSync(fileName, JSON.stringify(users), 'utf-8');

      fs.closeSync(fileDescriptor);
    }
  }
}

async function delay(milliseconds = 300) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function createFileName(coin: Coin, fileIndex: number): string {
  return `./src/database/seeds/data/${coin.identify}/${coin.identify}_${fileIndex}.json`;
}
