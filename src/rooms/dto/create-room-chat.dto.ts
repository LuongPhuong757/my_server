import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber } from "class-validator"


export class CreateRoomsChatDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'User_id send message',
    default: 1
  })
  user_id: number
}
