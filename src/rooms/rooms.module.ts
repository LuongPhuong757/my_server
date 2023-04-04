import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Rooms } from 'entities/rooms.entity'
import { RoomsController } from './rooms.controller'
import { RoomsService } from './rooms.service'
import { StringeeService } from './stringee.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Rooms
    ])
  ],
  providers: [RoomsService, StringeeService],
  controllers: [RoomsController],
  exports: []
})
export class RoomsModule { }
