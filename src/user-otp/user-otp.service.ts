import { InjectQueue } from '@nestjs/bull'
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Queue } from 'bull'
import { UserOtp } from 'entities/user-otp-code.entity'
import { User } from 'entities/user.entity'
import { MailService } from 'src/mail/mail.service'
import { Repository } from 'typeorm'
import { EXPIRED_CODE, OTP_RESPONSE, OTP_TYPE, STATUS_OTP } from './constant'
import { CreateUserOtpDto } from './dtos/create-user-otp.dto'
import { VerifyOtpDto } from './dtos/verify-otp.dto'

@Injectable()
export class UserOtpService {
  constructor(
    private mailService: MailService,
    @InjectRepository(UserOtp)
    private readonly repository: Repository<UserOtp>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectQueue('send-mail') private mailQueue: Queue
  ) { }

  async getOTPbyType(userOtpDto: CreateUserOtpDto): Promise<OTP_RESPONSE> {
    const code = Math.floor(100000 + Math.random() * 900000)
    const expiredSeconds = EXPIRED_CODE
    const expiredAt =
      Math.round(new Date().getTime() / 1000) + expiredSeconds
    const mailOptions = {
      from: 'phuong.luong@sotatek.com',
      to: userOtpDto.email,
      subject: "oke",
      html: `<p>${code}</p>`
    }
    await this.mailQueue.add('sendMail', { mailOptions })
    await this.repository.save({
      email: userOtpDto.email,
      code,
      type: userOtpDto.otpType ?? OTP_TYPE.SIGN_UP,
      status: STATUS_OTP.WAIT_VERIFY,
      expiredAt
    })
    return {
      message: 'Sent otp code to email.'
    }
  }

  async verifyOtp(dto: VerifyOtpDto): Promise<string> {
    // if change pass type then need check user exist inside database
    const userOtp = await this.repository.findOne({
      where: {
        email: dto.email,
        type: dto.otpType,
        status: STATUS_OTP.WAIT_VERIFY
      },
      order: {
        createdAt: 'DESC'
      }
    })
    if (!userOtp || dto.otp != userOtp.code) {
      throw new BadRequestException('Otp Wrong')
    } else if (new Date().getTime() / 1000 > userOtp.expiredAt) {
      throw new BadRequestException('Otp expired')
    }
    await this.repository.save({ id: userOtp.id, status: STATUS_OTP.VERIFIED })
    return 'Success'
  }

}
