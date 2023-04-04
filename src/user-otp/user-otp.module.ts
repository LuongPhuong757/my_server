import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserOtp } from 'entities/user-otp-code.entity'
import { User } from 'entities/user.entity'
import { MailConsumer } from 'src/mail/mail.consumer'
import { MailModule } from 'src/mail/mail.module'
import { UserOtpController } from './user-otp.controller'
import { UserOtpService } from './user-otp.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserOtp, User
    ]),
    MailModule,
    BullModule.registerQueue({
      name: 'send-mail'
    })
  ],
  providers: [UserOtpService, MailConsumer],
  controllers: [UserOtpController],
  exports: [UserOtpService]
})
export class UserOtpModule { }
