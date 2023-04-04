import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
  } from 'typeorm'
  
  @Entity('user_otp_code')
  export class UserOtp {
    @PrimaryGeneratedColumn()
    id: number
  
    @Column()
    code: number
  
    @Column({ name: 'expired_at', nullable: true })
    expiredAt: number
  
    @Column()
    email: string
  
    @Column({ nullable: true })
    type: string
  
    @Column()
    status: string
    
    @CreateDateColumn({ name: 'created_at', nullable: true })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at', nullable: true })
    updatedAt: Date
  }
  