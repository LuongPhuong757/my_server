import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
  } from 'typeorm'

  @Entity('messages')
  export class Messages extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
  
    @Column()
    message: string
  
    @Column()
    status: string

    @Column()
    type: string

    @Column()
    author: string

    @Column({ name: 'room_id' })
    roomId: string

    @Column()
    time: string
  
    @CreateDateColumn({ name: 'created_at', nullable: true })
    createdAt: Date
  
    @UpdateDateColumn({ name: 'updated_at', nullable: true })
    updatedAt: Date
  }
  