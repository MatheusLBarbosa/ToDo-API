import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class OTP {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({type: String, description: 'Código identificador do cliente'})
  cod_client: string;

  @Column()
  @ApiProperty({type: Number, description: 'Número de tentativas que o cliente pode realizar, para acertar o PIN'})
  auth_count: number;

  @Column()
  @ApiProperty({type: Date, description: 'Data de criação do PIN do OTP'})
  date_create: Date;

  @Column()
  @ApiProperty({type: Date, description: 'Data de expiração do PIN do OTP'})
  date_expiration: Date;

  @Column()
  @ApiProperty({type: Date, description: 'Data de validação do PIN do OTP'})
  date_validation: Date;
}
