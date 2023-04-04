import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserToken } from 'entities/user-token.entity'
import { Repository } from 'typeorm'
import { SaveTokenDto } from './dto/save-token.dto'

@Injectable()
export class UserTokenService {
  constructor(
    @InjectRepository(UserToken)
    private readonly userTokenRepository: Repository<UserToken>
  ) { }

  async saveTokenDevice(data: SaveTokenDto) {
    const { userId, token, expiredIn } = data
    const newUserToken = this.userTokenRepository.create({
      userId,
      token,
      expiredIn,
      isValid: true
    })
    await this.userTokenRepository.update(
      {
        userId,
        isValid: true
      },
      {
        isValid: false
      }
    )
    await this.userTokenRepository.insert(newUserToken)
  }

  getActiveUserToken(userId: number): Promise<UserToken> | null {
    return this.userTokenRepository.findOne({
      where: {
        userId,
        isValid: true
      },
      order: {
        createdAt: 'DESC'
      }
    })
  }
}
