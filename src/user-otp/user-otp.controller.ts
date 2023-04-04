import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { BaseApiResponse, SwaggerBaseApiResponse } from 'src/shared/dtos/base-api-response.dto'
import { OTP_RESPONSE } from './constant'
import { CreateUserOtpDto } from './dtos/create-user-otp.dto'
import { UserOtpService } from './user-otp.service'

@ApiTags('User Otp')
@Controller('user-otp')
export class UserOtpController {
  constructor(private readonly userOtpService: UserOtpService) {}

  @Get()
  @ApiOperation({
    summary: 'Create user OTP by Type'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(OTP_RESPONSE)
  })
  async createUserOtpByType(
    @Query() query: CreateUserOtpDto
  ): Promise<BaseApiResponse<OTP_RESPONSE>> {
    const data = await this.userOtpService.getOTPbyType(query)
    return {
      data,
      meta: {}
    }
  }
}
