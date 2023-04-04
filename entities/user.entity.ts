import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: '', length: 100 })
  userName: string

  @Column({ default: '', length: 100 })
  avatar: string

  @Column()
  password: string

  @Column('simple-array')
  roles: string[]

  @Unique('email', ['email'])
  @Column({ length: 200 })
  email: string

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date
}
