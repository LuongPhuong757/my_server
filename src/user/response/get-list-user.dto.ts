import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class GetListUserDto {
  @ApiProperty()
  @IsNumber()
  @Expose()
  id: number;

  @ApiProperty()
  @IsString()
  @Expose()
  userName: string

  @ApiProperty()
  @IsString()
  @Expose()
  avatar: string

  @ApiProperty()
  @IsString()
  @Expose()
  password: string

  @ApiProperty()
  @IsString()
  @Expose()
  roles: string[]

  @ApiProperty()
  @IsString()
  @Expose()
  email: string

  @ApiProperty()
  @IsString()
  @Expose()
  createdAt: Date

  @ApiProperty()
  @IsString()
  @Expose()
  updatedAt: Date
}