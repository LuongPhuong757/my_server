import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"


export class CreateRoomsChatResponse {
  @IsNumber()
  @Expose()
  @ApiProperty({})
  id: number

  @IsNumber()
  @ApiProperty({})
  @Expose()
  user1: number

  @IsNumber()
  @ApiProperty({})
  @Expose()
  user2: number

  @ApiProperty()
  @IsString()
  @Expose()
  createdAt: Date

  @ApiProperty()
  @IsString()
  @Expose()
  updatedAt: Date
}
