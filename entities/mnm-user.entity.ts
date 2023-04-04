import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm'

@Entity('users_mnm')
export class UserMNM extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: '', length: 100 })
  userName: string

  @Column()
  password: string

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date
}
