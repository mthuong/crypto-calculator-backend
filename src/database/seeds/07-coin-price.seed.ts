/* eslint-disable max-depth */
/* eslint-disable security/detect-non-literal-fs-filename */
import { Coin } from '@modules/coin/coin.entity';
import { cleanTable } from '@modules/common/utils/query';
import { GetPriceResponse } from '@modules/price/dto/get-price.dto';
import { Price } from '@modules/price/price.entity';
import axios from 'axios';
import { add, format, isBefore } from 'date-fns';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { coins } from './data';

const prices: Price[] = [
  // new Price({
  //   coinId: 3,
  //   date: new Date('2021-04-30T00:00:00'),
  //   aed: 10.862864700849201,
  //   ars: 276.5360512188553,
  //   aud: 3.803079761198971,
  //   bch: 0.003357909288674648,
  //   bdt: 250.7189287094506,
  //   bhd: 1.1151254941956552,
  //   bmd: 2.957484628633865,
  //   bnb: 0.004928422456881903,
  //   brl: 15.786757199184681,
  //   btc: 0.00005517489813700061,
  //   cad: 3.631167094705742,
  //   chf: 2.6880843963269743,
  //   clp: 2098.036570046086,
  //   cny: 19.141432013444117,
  //   czk: 63.06854306966411,
  //   dkk: 18.13811126814933,
  //   dot: 0.08298603615973638,
  //   eos: 0.5029608187491528,
  //   eth: 0.0010704976048938244,
  //   eur: 2.4392357247044676,
  //   gbp: 2.1199841314973247,
  //   hkd: 22.960875537093298,
  //   huf: 878.8972316642515,
  //   idr: 42588.96164617911,
  //   ils: 9.609459055357133,
  //   inr: 219.16750376377257,
  //   jpy: 322.0020539117694,
  //   krw: 3275.348871716684,
  //   kwd: 0.890282725303765,
  //   lkr: 573.147295157985,
  //   ltc: 0.011561000697863111,
  //   mmk: 4605.1728205687505,
  //   mxn: 59.264667745099786,
  //   myr: 12.133080688970432,
  //   ngn: 1167.7003553706604,
  //   nok: 24.211084141701782,
  //   nzd: 4.081668898247027,
  //   php: 142.86267908896525,
  //   pkr: 454.08210485785963,
  //   pln: 11.142843855672716,
  //   rub: 221.06872275728963,
  //   sar: 11.0922826984616,
  //   sek: 24.74981066919988,
  //   sgd: 3.921121845181636,
  //   thb: 92.22620065931854,
  //   try: 24.283019040324074,
  //   twd: 82.44609474088932,
  //   uah: 82.06579179249296,
  //   usd: 2.957484628633865,
  //   vef: 0.2961329358651086,
  //   vnd: 68174.43186114376,
  //   xag: 0.11335485531928022,
  //   xau: 0.0016676072827014918,
  //   xdr: 2.0517135563299402,
  //   xlm: 5.977973976672367,
  //   xrp: 2.1160279722110373,
  //   yfi: 0.00006313408482810282,
  //   zar: 42.27546827554393,
  //   bits: 55.17489813700061,
  //   link: 0.0813828555493061,
  //   sats: 5517.489813700061,
  // }),
];

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

    fs.openSync(fileName, 'w');

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
            fs.closeSync();
            fileIndex++;

            fileName = createFileName(coin, fileIndex);

            fs.openSync(fileName, 'w');

            users = [];
          }
        }
      } catch (error) {
        console.log(error);
        await delay(60 * 1000);
        continue;
      }

      await delay(700);

      icoDate = add(icoDate, { days: 1 });

      console.log(`\n${icoDate}`);
    }

    if (users.length > 0) {
      fs.appendFileSync(fileName, JSON.stringify(users), 'utf-8');

      fs.closeSync();
    }
  }
}

async function delay(milliseconds = 300) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function createFileName(coin: Coin, fileIndex: number): string {
  return `./src/database/seeds/data/${coin.identify}/${coin.identify}_${fileIndex}.json`;
}
