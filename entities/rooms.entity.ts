import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './user.entity'

@Entity('rooms')
export class Rooms extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'user_id_1' })
  userId1: number

  @Column({ name: 'user_id_2' })
  userId2: number

  @Column({ name: 'last_message', nullable: true })
  lastMessage: string

  @Column({ name: 'last_sender', nullable: true })
  lastSender: number

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id_1' })
  user1: User

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id_2' })
  user2: User

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date
}
