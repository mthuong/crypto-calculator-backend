import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1627488793501 implements MigrationInterface {
  name = 'Initial1627488793501';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `price` (`id` int NOT NULL AUTO_INCREMENT, `coin_id` int NULL, `date` datetime NOT NULL, `aed` float NOT NULL DEFAULT '0', `ars` float NOT NULL DEFAULT '0', `aud` float NOT NULL DEFAULT '0', `bch` float NOT NULL DEFAULT '0', `bdt` float NOT NULL DEFAULT '0', `bhd` float NOT NULL DEFAULT '0', `bmd` float NOT NULL DEFAULT '0', `bnb` float NOT NULL DEFAULT '0', `brl` float NOT NULL DEFAULT '0', `btc` float NOT NULL DEFAULT '0', `cad` float NOT NULL DEFAULT '0', `chf` float NOT NULL DEFAULT '0', `clp` float NOT NULL DEFAULT '0', `cny` float NOT NULL DEFAULT '0', `czk` float NOT NULL DEFAULT '0', `dkk` float NOT NULL DEFAULT '0', `dot` float NOT NULL DEFAULT '0', `eos` float NOT NULL DEFAULT '0', `eth` float NOT NULL DEFAULT '0', `eur` float NOT NULL DEFAULT '0', `gbp` float NOT NULL DEFAULT '0', `hkd` float NOT NULL DEFAULT '0', `huf` float NOT NULL DEFAULT '0', `idr` float NOT NULL DEFAULT '0', `ils` float NOT NULL DEFAULT '0', `inr` float NOT NULL DEFAULT '0', `jpy` float NOT NULL DEFAULT '0', `krw` float NOT NULL DEFAULT '0', `kwd` float NOT NULL DEFAULT '0', `lkr` float NOT NULL DEFAULT '0', `ltc` float NOT NULL DEFAULT '0', `mmk` float NOT NULL DEFAULT '0', `mxn` float NOT NULL DEFAULT '0', `myr` float NOT NULL DEFAULT '0', `ngn` float NOT NULL DEFAULT '0', `nok` float NOT NULL DEFAULT '0', `nzd` float NOT NULL DEFAULT '0', `php` float NOT NULL DEFAULT '0', `pkr` float NOT NULL DEFAULT '0', `pln` float NOT NULL DEFAULT '0', `rub` float NOT NULL DEFAULT '0', `sar` float NOT NULL DEFAULT '0', `sek` float NOT NULL DEFAULT '0', `sgd` float NOT NULL DEFAULT '0', `thb` float NOT NULL DEFAULT '0', `try` float NOT NULL DEFAULT '0', `twd` float NOT NULL DEFAULT '0', `uah` float NOT NULL DEFAULT '0', `usd` float NOT NULL DEFAULT '0', `vef` float NOT NULL DEFAULT '0', `vnd` float NOT NULL DEFAULT '0', `xag` float NOT NULL DEFAULT '0', `xau` float NOT NULL DEFAULT '0', `xdr` float NOT NULL DEFAULT '0', `xlm` float NOT NULL DEFAULT '0', `xrp` float NOT NULL DEFAULT '0', `yfi` float NOT NULL DEFAULT '0', `zar` float NOT NULL DEFAULT '0', `bits` float NOT NULL DEFAULT '0', `link` float NOT NULL DEFAULT '0', `sats` float NOT NULL DEFAULT '0', `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, INDEX `IDX_Coin_Price_Coin_Id` (`coin_id`), INDEX `IDX_Price_date` (`date`), INDEX `IDX_Price_Created_At` (`created_at`), INDEX `IDX_Price_Updated_At` (`updated_at`), INDEX `IDX_Price_Deleted_At` (`deleted_at`), PRIMARY KEY (`id`)) ENGINE=InnoDB",
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
    await queryRunner.query('ALTER TABLE `price` DROP FOREIGN KEY `FK_817581b895c823640421c322e61`');
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
