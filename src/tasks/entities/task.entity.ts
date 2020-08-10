import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({type: String, description: 'description'})
  description: string;

  @Column()
  @ApiProperty({type: Boolean, description: 'completed'})
  completed: boolean;
}
