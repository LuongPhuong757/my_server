import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableRoomMessage1667528024378 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `rooms` ( ' +
      '`id` int NOT NULL AUTO_INCREMENT,' +
      '`user_id_1` varchar(50) NOT NULL,' +
      '`user_id_2` varchar(50) NOT NULL,' +
      '`last_message` longtext,' +
      '`last_sender` int,' +
      '`created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),' +
      '`updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),' +
      ' PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `room_message`');
  }

}
