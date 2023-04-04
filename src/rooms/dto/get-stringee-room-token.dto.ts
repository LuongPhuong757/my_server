import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"


export class GetStringeeRoomTokenDto {
  @IsNotEmpty()
  @IsString()
  // @ApiProperty({
  //   description: 'Room video id',
  //   default: 1
  // })
  roomId: string
}
