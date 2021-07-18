const common = require('./ormconfig.common');

module.exports = Object.assign(common, {
  seeds: ['src/database/seeds/*.seed.ts'],
  // factories: ['./factories/**/*.factory.ts'],
  entities: [
    'src/modules/**/*.entity{.ts,.js}',
    'src/modules/**/entity/*.entity{.ts,.js}',
  ],
  migrations: ['src/database/migrations/mysql/*{.ts,.js}'],
  logging: false,
});
