import { BadRequestException, Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rooms } from 'entities/rooms.entity';
import { User } from 'entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRoomsChatDto } from './dto/create-room-chat.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Rooms)
    private readonly roomsRepository: Repository<Rooms>,
  ) { }

  async getListRoom(userId: number) {
    const listRoom = await this.roomsRepository.find({
      where: [
        { user1: userId },
        { user2: userId }
      ]
    })

    return listRoom ? listRoom : []
  }

  async createRoomChat(createRoomChat: CreateRoomsChatDto, user: User): Promise<Rooms> {
    const room = new Rooms()
    room.userId1 = user.id;
    room.userId2 = createRoomChat.user_id;
    const _room = await this.findRoomByUser1AndUser2(user.id, createRoomChat.user_id)
    if (_room) {
      return _room
    }
    return room.save()

  }

  async findRoomByUser1AndUser2(userId1: number, userId2: number) {
    return await this.roomsRepository.findOne({
      where: [{
        userId1, userId2
      }, {
        userId1: userId2,
        userId2: userId1
      }]
    })
  }

  async findMyRooms(user: User) {
    return await this.roomsRepository.createQueryBuilder('rooms')
      .where(`rooms.user_id_1 = ${user.id} or rooms.user_id_2 = ${user.id}`)
      .leftJoinAndSelect('rooms.user1', 'user1')
      .leftJoinAndSelect('rooms.user2', 'user2')
      .orderBy("rooms.updatedAt", "DESC")
      .getMany()
  }

  async deleteRoomChat(id: number, user) {
    const room = await this.roomsRepository.findOne({
      id
    })
    if (!room) throw new BadRequestException("Room not found")
    if (room.userId1 == user.id || room.userId2 == user.id) {
      return await this.roomsRepository.delete({
        id
      })
    }
    throw new BadRequestException("This chat room does not belong to you")
  }
}