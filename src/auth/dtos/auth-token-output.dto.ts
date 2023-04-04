import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"
import { User } from "entities/user.entity"

export class AuthTokenOutput {
    @Expose()
    @ApiProperty()
    accessToken: string
  
    @Expose()
    @ApiProperty()
    refreshToken: string
  
    @ApiProperty({
      type: User
    })
    @Expose()
    user: User
  }