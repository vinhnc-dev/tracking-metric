import {
  IsDate,
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsString,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('metric_distances')
export class MetricDistance {
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
  @IsEnum(['meter', 'centimeter', 'inch', 'feet', 'yard'])
  unit: string;

  @Column()
  @IsDate()
  date: Date;

  @CreateDateColumn({ name: 'created_at' })
  @IsDateString()
  createdAt: string;
}
