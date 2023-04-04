import { BadRequestException, Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rooms } from 'entities/rooms.entity';
import { User } from 'entities/user.entity';
import { Repository } from 'typeorm';
import { CreateRoomsChatDto } from './dto/create-room-chat.dto';
import axios, { isCancel, AxiosError } from 'axios';
import { BASE_URL, PROJECT_ID, PROJECT_SECRET } from './contants/stringee.contants';
@Injectable()
export class StringeeService {
  // private restToken: string
  constructor(
    // @InjectRepository(Rooms)
    // private readonly roomsRepository: Repository<Rooms>,
    // this.restToken = "";
  ) {
    // this.restToken = "";
  }

  async createRoom() {
    const roomName = Math.random().toFixed(4);
    const response = await axios.post(
      `${BASE_URL}/create`,
      {
        name: roomName,
        uniqueName: roomName
      },
      {
        headers: await this._authHeader()
      }
    );

    const room = response.data;
    console.log({ room });
    return room;
  }

  async _authHeader() {
    const restToken = await this.setRestToken();
    return {
      "X-STRINGEE-AUTH": restToken
    };
  }

  async setRestToken() {
    const tokens = await this._getToken({ rest: true });
    const restToken = tokens.rest_access_token;
    // this.restToken = restToken;

    return restToken;
  }

  async _getToken({ userId, roomId, rest }: any) {
    const response = await axios.get(
      "https://v2.stringee.com/web-sdk-conference-samples/php/token_helper.php",
      {
        params: {
          keySid: PROJECT_ID,
          keySecret: PROJECT_SECRET,
          userId,
          roomId,
          rest
        }
      }
    );

    const tokens = response.data;
    console.log({ tokens });
    return tokens;
  }

  async getRoomToken(roomId: string) {
    console.log("thisssssssssssssssssssssssssssssssssssssssssssssss")
    const tokens = await this._getToken({ roomId });
    return tokens;
  }
}