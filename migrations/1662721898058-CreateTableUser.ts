import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUser1662721898058 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `users` ( ' +
      '`id` int NOT NULL AUTO_INCREMENT, ' +
      '`username` varchar(200) DEFAULT "",' +
      '`avatar` varchar(200) DEFAULT "",' +
      '`password` varchar(200) DEFAULT NULL, ' +
      '`email` varchar(200) NOT NULL,' +
      '`roles` varchar(200) NOT NULL,' +
      '`created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),' +
      '`updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),' +
      ' UNIQUE INDEX `email` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `users`');
  }

}
