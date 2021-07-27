import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1626964662076 implements MigrationInterface {
  name = 'Initial1626964662076';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `price` (`id` int NOT NULL AUTO_INCREMENT, `coin_id` int NULL, `date` datetime NOT NULL, `aed` int NOT NULL DEFAULT '0', `ars` int NOT NULL DEFAULT '0', `aud` int NOT NULL DEFAULT '0', `bch` int NOT NULL DEFAULT '0', `bdt` int NOT NULL DEFAULT '0', `bhd` int NOT NULL DEFAULT '0', `bmd` int NOT NULL DEFAULT '0', `bnb` int NOT NULL DEFAULT '0', `brl` int NOT NULL DEFAULT '0', `btc` int NOT NULL DEFAULT '0', `cad` int NOT NULL DEFAULT '0', `chf` int NOT NULL DEFAULT '0', `clp` int NOT NULL DEFAULT '0', `cny` int NOT NULL DEFAULT '0', `czk` int NOT NULL DEFAULT '0', `dkk` int NOT NULL DEFAULT '0', `dot` int NOT NULL DEFAULT '0', `eos` int NOT NULL DEFAULT '0', `eth` int NOT NULL DEFAULT '0', `eur` int NOT NULL DEFAULT '0', `gbp` int NOT NULL DEFAULT '0', `hkd` int NOT NULL DEFAULT '0', `huf` int NOT NULL DEFAULT '0', `idr` int NOT NULL DEFAULT '0', `ils` int NOT NULL DEFAULT '0', `inr` int NOT NULL DEFAULT '0', `jpy` int NOT NULL DEFAULT '0', `krw` int NOT NULL DEFAULT '0', `kwd` int NOT NULL DEFAULT '0', `lkr` int NOT NULL DEFAULT '0', `ltc` int NOT NULL DEFAULT '0', `mmk` int NOT NULL DEFAULT '0', `mxn` int NOT NULL DEFAULT '0', `myr` int NOT NULL DEFAULT '0', `ngn` int NOT NULL DEFAULT '0', `nok` int NOT NULL DEFAULT '0', `nzd` int NOT NULL DEFAULT '0', `php` int NOT NULL DEFAULT '0', `pkr` int NOT NULL DEFAULT '0', `pln` int NOT NULL DEFAULT '0', `rub` int NOT NULL DEFAULT '0', `sar` int NOT NULL DEFAULT '0', `sek` int NOT NULL DEFAULT '0', `sgd` int NOT NULL DEFAULT '0', `thb` int NOT NULL DEFAULT '0', `try` int NOT NULL DEFAULT '0', `twd` int NOT NULL DEFAULT '0', `uah` int NOT NULL DEFAULT '0', `usd` int NOT NULL DEFAULT '0', `vef` int NOT NULL DEFAULT '0', `vnd` int NOT NULL DEFAULT '0', `xag` int NOT NULL DEFAULT '0', `xau` int NOT NULL DEFAULT '0', `xdr` int NOT NULL DEFAULT '0', `xlm` int NOT NULL DEFAULT '0', `xrp` int NOT NULL DEFAULT '0', `yfi` int NOT NULL DEFAULT '0', `zar` int NOT NULL DEFAULT '0', `bits` int NOT NULL DEFAULT '0', `link` int NOT NULL DEFAULT '0', `sats` int NOT NULL DEFAULT '0', `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, INDEX `IDX_Coin_Price_Coin_Id` (`coin_id`), INDEX `IDX_Price_date` (`date`), INDEX `IDX_Price_Created_At` (`created_at`), INDEX `IDX_Price_Updated_At` (`updated_at`), INDEX `IDX_Price_Deleted_At` (`deleted_at`), PRIMARY KEY (`id`)) ENGINE=InnoDB",
    );
    await queryRunner.query(
      'CREATE TABLE `coin` (`id` int NOT NULL AUTO_INCREMENT, `identify` varchar(100) NOT NULL, `symbol` varchar(100) NOT NULL, `name` varchar(100) NOT NULL, `image` varchar(255) NULL, `icoDate` datetime NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, UNIQUE INDEX `UIDX_Coin_identify` (`identify`), UNIQUE INDEX `UIDX_Coin_symbol` (`symbol`), INDEX `IDX_Coin_ICO_Date` (`icoDate`), INDEX `IDX_Coin_Created_At` (`created_at`), INDEX `IDX_Coin_Updated_At` (`updated_at`), INDEX `IDX_Coin_Deleted_At` (`deleted_at`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
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
    await queryRunner.query('DROP INDEX `IDX_Coin_ICO_Date` ON `coin`');
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
