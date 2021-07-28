import { createPasswordHash } from '@modules/common/utils';
import { cleanTable } from '@modules/common/utils/query';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

const users = [
  {
    username: 'admin',
    email: 'admin@tom.com',
    password: createPasswordHash('12345678@Xy'),
    firstName: 'Tom',
    lastName: 'Admin',
    isActive: true,
  },
];

export default class CreateUser implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await cleanTable(connection, 'user');

    await connection.createQueryBuilder().insert().into('user').values(users).execute();
  }
}
