
import { Controller, Get, HttpStatus, UseGuards, Body, Query, Post, Delete, Param } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Rooms } from 'entities/rooms.entity'
import { User } from 'entities/user.entity'
import { UserScope } from 'src/auth/decorators/user.decorator'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard'
import { CreateRoomsChatResponse } from './response/create-room-chat.dto'
import { CreateRoomsChatDto } from './dto/create-room-chat.dto'
import { RoomsService } from './rooms.service'
import { StringeeService } from './stringee.service'
import { GetStringeeRoomTokenDto } from './dto/get-stringee-room-token.dto'

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly stringeeService: StringeeService
  ) {
  }

  @Post('/stringee/set-rest-token')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create rest token for user'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateRoomsChatResponse
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED
  })
  async setRestToken(
    // @UserScope() user: User,
    // @Body() createRoomsChatDto: CreateRoomsChatDto
  ): Promise<Rooms> {
    return this.stringeeService.setRestToken()
  }

  @Post('/stringee/create-room')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create room for user'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateRoomsChatResponse
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED
  })
  async CreateStringeeRoom(
    // @UserScope() user: User,
    // @Body() createRoomsChatDto: CreateRoomsChatDto
  ): Promise<Rooms> {
    return this.stringeeService.createRoom()
  }

  @Post('/stringee/create-room-token')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create room token for user'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateRoomsChatResponse
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED
  })
  async CreateStringeeRoomToken(
    // @UserScope() user: User,
    @Body() getStringeeRoomTokenDto: GetStringeeRoomTokenDto
  ): Promise<Rooms> {
    return this.stringeeService.getRoomToken(getStringeeRoomTokenDto.roomId)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get list room for user'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [CreateRoomsChatResponse]
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED
  })
  async getMyProfile(
    @UserScope() user: User
  ): Promise<Rooms[]> {
    return this.roomsService.findMyRooms(user)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create room for user'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateRoomsChatResponse
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED
  })
  async createRoomChat(
    @UserScope() user: User,
    @Body() createRoomsChatDto: CreateRoomsChatDto
  ): Promise<Rooms> {
    return this.roomsService.createRoomChat(createRoomsChatDto, user)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete room chat'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateRoomsChatResponse
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED
  })
  async deleteRoomChat(
    @UserScope() user: User,
    @Param('id') id: number
  ) {
    return this.roomsService.deleteRoomChat(id, user)
  }

}
