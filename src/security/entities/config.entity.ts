import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Config {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({type: String, description: 'Nome da configuração'})
  config_name: string;

  @Column()
  @ApiProperty({type: String, description: 'Valor da configuração'})
  value: number;
}
