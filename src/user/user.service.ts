import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { User } from 'entities/user.entity';
import { Repository } from 'typeorm';
import { UserOutput } from './dto/user-output.dto';
import * as _ from 'lodash'
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email });
    return user
  }

  async findById(id: number): Promise<UserOutput> {
    const user = await this.userRepository.findOne(id);
    return plainToClass(UserOutput, { ...user }, {
      excludeExtraneousValues: true,
    });
  }

  async getListUser(): Promise<User[]> {
    return this.userRepository.find()
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id
      }
    })
    return _.pick(user, ['userName', 'avatar'])
  }
}
