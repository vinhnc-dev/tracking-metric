import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column({name: 'phone_number'})
  @IsString()
  @IsOptional()
  phoneNumber: string;

  @CreateDateColumn({name: 'created_at'})
  @IsDateString()
  createdAt: string;
}
