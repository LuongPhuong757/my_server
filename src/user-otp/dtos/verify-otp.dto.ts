import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString
} from 'class-validator'
import { OTP_TYPE } from '../constant'

export class VerifyOtpDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: 'number',
    default: 123456
  })
  otp: number

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
