import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OTP } from '../entities/otp.entity';
import { getConnection, getRepository, Repository, getManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OtpResponse } from '../entities/otpResponse.entity';
import { Config } from '../entities/config.entity';
import { exception } from 'console';
import { ValidateRequest } from '../entities/validateRequest.entity';

@Injectable()
export class SecurityService {
  constructor(
    @InjectRepository(OTP)
    private otpRepos: Repository<OTP>,
  ) {}

  async create(otp: OTP): Promise<OtpResponse> {
    try {
      const otpRes = new OtpResponse();
      const codCheck = await this.checkCodExistence(otp.cod_client);
      const pin = this.generatePin();

      otpRes.cod_client = otp.cod_client;
      otpRes.otp_pin = pin;

      if (codCheck !== undefined) {
        await getConnection()
          .createQueryBuilder()
          .update(OTP)
          .set({ otp_pin: pin })
          .where('id = :id', { id: codCheck.id })
          .execute();

        return this.otpRepos.create(otpRes);
      } else {
        otp.otp_pin = pin;

        await getConnection()
          .createQueryBuilder()
          .insert()
          .into(OTP)
          .values(otp)
          .execute();

        return this.otpRepos.create(otpRes);
      }
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async validate(validateObj: ValidateRequest) {
    try {
      const codInfo = await this.checkCodExistence(validateObj.cod_client);

      console.log(codInfo.createdAt.getSeconds());
    } catch (err) {
      throw new exception('');
    }
  }

  private async checkCodExistence(cod: string): Promise<OTP> {
    try {
      const search = await getRepository(OTP)
        .createQueryBuilder('otp')
        .where('otp.cod_client like :cod', { cod: '%' + cod + '%' })
        .getOne();

      return search;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  private generatePin(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }
}
