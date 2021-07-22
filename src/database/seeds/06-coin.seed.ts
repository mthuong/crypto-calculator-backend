import { cleanTable } from '@modules/common/utils/query';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { coins } from './data';

export default class CreateCoin implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await cleanTable(connection, 'coin');

    await connection.createQueryBuilder().insert().into('coin').values(coins).execute();
  }
}
