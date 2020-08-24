import { Injectable } from '@nestjs/common';
import { OTP } from '../entities/otp.entity';
import { getConnection, getRepository } from 'typeorm';

@Injectable()
export class SecurityService {
  async create(cod: string) {
    
    return null;
  }

  async validate(cod: string, pin: number) {
    return null;
  }

  private async checkCodExistence(cod: string): Promise<boolean> {
    try {
      const search = await getRepository(OTP)
        .createQueryBuilder('otp')
        .where('otp.cod_client like :cod', { cod: '%' + cod + '%' })
        .getMany();

      if (search.toString() === cod) {
        return true;
      }
      return false;
    } catch (error) {}
  }

  private async createCodRegister(cod: string, pin: number){
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(OTP)
      .values([
        {cod_client: cod, otp_pin: pin, date_create: Date.now()}])
      .execute();
  }

  private generatePin(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }
}
