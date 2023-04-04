import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator'
import { OTP_TYPE } from '../constant'

export class CreateUserOtpDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'email user',
    default: 'luongphuong757@gmail.com'
  })
  email: string

  @IsEnum(OTP_TYPE)
  @IsNotEmpty()
  @ApiProperty({
    enum: OTP_TYPE,
    default: OTP_TYPE.SIGN_UP,
    description: 'Otp type'
  })
  otpType: OTP_TYPE
}
