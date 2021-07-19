import { cleanTable } from '@modules/common/utils/query';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

const coins = [
  {
    id: 1,
    identify: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image:
      'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
  },
  {
    id: 2,
    identify: 'binancecoin',
    symbol: 'bnb',
    name: 'Binance Coin',
    image:
      'https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png?1547034615',
  },
  {
    id: 3,
    identify: 'tokocrypto',
    symbol: 'tko',
    name: 'Tokocrypto',
    image:
      'https://assets.coingecko.com/coins/images/14577/large/tko-logo.png?1617093467',
  },
];

export default class CreateCoin implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await cleanTable(connection, 'coin');

    await connection
      .createQueryBuilder()
      .insert()
      .into('coin')
      .values(coins)
      .execute();
  }
}
