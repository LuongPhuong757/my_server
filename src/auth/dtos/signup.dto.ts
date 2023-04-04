import { ApiProperty } from '@nestjs/swagger'
import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
} from 'class-validator'

export class SignupDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        type: 'email',
        default: 'anh.nguyen5@sotatek.com'
    })
    email: string

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        type: 'userName',
        default: 'anh.nguyen5'
    })
    userName: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        type: 'password',
        default: 123456
    })
    password: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        type: 'number',
        default: 123456
    })
    otp: number
}
