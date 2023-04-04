import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableMessage1664158423388 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `messages` ( ' +
      '`id` int NOT NULL AUTO_INCREMENT, ' +
      '`message` longtext NOT NULL, ' +
      '`status` varchar(200) DEFAULT NULL, ' +
      '`author` varchar(200) NOT NULL, ' +
      '`type` varchar(200) DEFAULT NULL,' +
      '`room_id` int NOT NULL,' +
      '`time` varchar(200) NOT NULL, ' +
      '`created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),' +
      '`updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),' +
      ' PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `message`');
  }

}
