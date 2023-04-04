
import { Controller, Get, HttpStatus, UseGuards, Request, Param } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from 'entities/user.entity'
import { UserScope } from 'src/auth/decorators/user.decorator'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard'
import { SwaggerBaseApiResponse } from 'src/shared/dtos/base-api-response.dto'
import { GetListUserDto } from './response/get-list-user.dto'
import { UserService } from './user.service'


@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({
    summary: 'Get user me API'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(User)
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED
  })
  async getMyProfile(
    @UserScope() user: User,
    @Request() req
  ) {
    return req.user
  }

  @Get('list-user')
  @ApiOperation({
    summary: 'Get list user API'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [GetListUserDto]
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED
  })
  async getListUser(
  ): Promise<User[]> {
    return this.userService.getListUser()
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by Id'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(User)
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED
  })
  async getUserByID(
    @Param() params
  ) {
    return this.userService.getUserById(params.id)
  }
}
