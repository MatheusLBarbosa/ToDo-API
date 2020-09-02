import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class OTP {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({ type: String, description: 'Código identificador do cliente' })
  cod_client: string;

  @Column({ nullable: true })
  @ApiProperty({ type: Number, description: 'Código OTP' })
  otp_pin: number;

  @Column({ default: 0 })
  @ApiProperty({
    type: Number,
    description:
      'Número de tentativas que o cliente pode realizar, para acertar o PIN',
  })
  auth_count: number;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: true,
    default: () => "SYSTIMESTAMP",
    update: true
  })
  @ApiProperty({ type: Date, description: 'Data de criação do PIN do OTP' })
  createdAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: true,
    default: () => "SYSTIMESTAMP+50/(24*60*60)",
    update: true
  })
  @ApiProperty({ type: Date, description: 'Data de expiração do PIN do OTP' })
  expiredAt: Date;

  @Column({ type: 'date', nullable: true })
  @ApiProperty({ type: Date, description: 'Data de validação do PIN do OTP' })
  validateAt: Date;
}
