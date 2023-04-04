import { Controller, Get, HttpStatus, MessageEvent, Query, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { Messages } from "entities/message.entity"
import { User } from "entities/user.entity"
import { UserScope } from "src/auth/decorators/user.decorator"
import { JwtAuthGuard } from "src/auth/guards/jwt-auth-guard"
import { MessageService } from "./message.service"

@ApiTags('messages')
@Controller('messages')
export class MessageController {
  constructor(
    private readonly messageService: MessageService
  ) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get message for user'
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED
  })
  async getMyProfile(
    @UserScope() user: User,
    @Query('roomId') roomId: number
  ): Promise<Messages[]> {
    return await this.messageService.getAllMessages(user, roomId)
  }

}
