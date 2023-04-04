import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Messages } from "entities/message.entity";
import { User } from "entities/user.entity";
import { Repository } from "typeorm";


@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Messages)
    private readonly messageRepository: Repository<Messages>,
  ) { }

  async getAllMessages(user: User, roomId: number) {
    return await this.messageRepository.find({
      where: {
        roomId
      },
      order: {
        id: "DESC"
      }
    })
  }
}