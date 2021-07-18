import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1626626994817 implements MigrationInterface {
  name = 'Initial1626626994817';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(100) NOT NULL, `email` varchar(100) NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `isActive` tinyint NOT NULL DEFAULT 1, `password` varchar(100) NULL, UNIQUE INDEX `UIDX_User_username` (`username`), UNIQUE INDEX `UIDX_User_email` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX `UIDX_User_email` ON `user`');
    await queryRunner.query('DROP INDEX `UIDX_User_username` ON `user`');
    await queryRunner.query('DROP TABLE `user`');
  }
}
