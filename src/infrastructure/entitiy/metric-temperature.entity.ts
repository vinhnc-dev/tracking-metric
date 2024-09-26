import { IsDateString, IsEnum, IsInt, IsNumber } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('metric_temperatures')
export class MetricTemperature {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  @IsNumber()
  value: number;

  @Column()
  @IsEnum(['C', 'F', 'K'])
  unit: string;

  @Column()
  @IsDateString()
  date: Date;

  @CreateDateColumn({ name: 'created_at' })
  @IsDateString()
  createdAt: string;
}
