import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Messages } from "entities/message.entity";
import { MessageController } from "./message.controller";
import { MessageService } from "./message.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Messages
    ])
  ],
  providers: [MessageService],
  controllers: [MessageController],
  exports: []
})
export class MessageModule { }
