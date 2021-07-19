import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1626708530061 implements MigrationInterface {
  name = 'Initial1626708530061';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `price` (`id` int NOT NULL AUTO_INCREMENT, `coin_id` int NULL, `date` datetime NOT NULL, `aed` int NOT NULL, `ars` int NOT NULL, `aud` int NOT NULL, `bch` int NOT NULL, `bdt` int NOT NULL, `bhd` int NOT NULL, `bmd` int NOT NULL, `bnb` int NOT NULL, `brl` int NOT NULL, `btc` int NOT NULL, `cad` int NOT NULL, `chf` int NOT NULL, `clp` int NOT NULL, `cny` int NOT NULL, `czk` int NOT NULL, `dkk` int NOT NULL, `dot` int NOT NULL, `eos` int NOT NULL, `eth` int NOT NULL, `eur` int NOT NULL, `gbp` int NOT NULL, `hkd` int NOT NULL, `huf` int NOT NULL, `idr` int NOT NULL, `ils` int NOT NULL, `inr` int NOT NULL, `jpy` int NOT NULL, `krw` int NOT NULL, `kwd` int NOT NULL, `lkr` int NOT NULL, `ltc` int NOT NULL, `mmk` int NOT NULL, `mxn` int NOT NULL, `myr` int NOT NULL, `ngn` int NOT NULL, `nok` int NOT NULL, `nzd` int NOT NULL, `php` int NOT NULL, `pkr` int NOT NULL, `pln` int NOT NULL, `rub` int NOT NULL, `sar` int NOT NULL, `sek` int NOT NULL, `sgd` int NOT NULL, `thb` int NOT NULL, `try` int NOT NULL, `twd` int NOT NULL, `uah` int NOT NULL, `usd` int NOT NULL, `vef` int NOT NULL, `vnd` int NOT NULL, `xag` int NOT NULL, `xau` int NOT NULL, `xdr` int NOT NULL, `xlm` int NOT NULL, `xrp` int NOT NULL, `yfi` int NOT NULL, `zar` int NOT NULL, `bits` int NOT NULL, `link` int NOT NULL, `sats` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, INDEX `IDX_Coin_Price_Coin_Id` (`coin_id`), INDEX `IDX_Price_date` (`date`), INDEX `IDX_Price_Created_At` (`created_at`), INDEX `IDX_Price_Updated_At` (`updated_at`), INDEX `IDX_Price_Deleted_At` (`deleted_at`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `coin` (`id` int NOT NULL AUTO_INCREMENT, `identify` varchar(100) NOT NULL, `symbol` varchar(100) NOT NULL, `name` varchar(100) NOT NULL, `image` varchar(255) NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, UNIQUE INDEX `UIDX_Coin_identify` (`identify`), UNIQUE INDEX `UIDX_Coin_symbol` (`symbol`), INDEX `IDX_Coin_Created_At` (`created_at`), INDEX `IDX_Coin_Updated_At` (`updated_at`), INDEX `IDX_Coin_Deleted_At` (`deleted_at`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(100) NOT NULL, `email` varchar(100) NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `isActive` tinyint NOT NULL DEFAULT 1, `password` varchar(100) NULL, UNIQUE INDEX `UIDX_User_username` (`username`), UNIQUE INDEX `UIDX_User_email` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `price` ADD CONSTRAINT `FK_817581b895c823640421c322e61` FOREIGN KEY (`coin_id`) REFERENCES `coin`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `price` DROP FOREIGN KEY `FK_817581b895c823640421c322e61`',
    );
    await queryRunner.query('DROP INDEX `UIDX_User_email` ON `user`');
    await queryRunner.query('DROP INDEX `UIDX_User_username` ON `user`');
    await queryRunner.query('DROP TABLE `user`');
    await queryRunner.query('DROP INDEX `IDX_Coin_Deleted_At` ON `coin`');
    await queryRunner.query('DROP INDEX `IDX_Coin_Updated_At` ON `coin`');
    await queryRunner.query('DROP INDEX `IDX_Coin_Created_At` ON `coin`');
    await queryRunner.query('DROP INDEX `UIDX_Coin_symbol` ON `coin`');
    await queryRunner.query('DROP INDEX `UIDX_Coin_identify` ON `coin`');
    await queryRunner.query('DROP TABLE `coin`');
    await queryRunner.query('DROP INDEX `IDX_Price_Deleted_At` ON `price`');
    await queryRunner.query('DROP INDEX `IDX_Price_Updated_At` ON `price`');
    await queryRunner.query('DROP INDEX `IDX_Price_Created_At` ON `price`');
    await queryRunner.query('DROP INDEX `IDX_Price_date` ON `price`');
    await queryRunner.query('DROP INDEX `IDX_Coin_Price_Coin_Id` ON `price`');
    await queryRunner.query('DROP TABLE `price`');
  }
}
