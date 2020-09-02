import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OTP } from '../entities/otp.entity';
import { getConnection, getRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OtpResponse } from '../entities/otpResponse.entity';
import { exception } from 'console';
import { ValidateRequest } from '../entities/validateRequest.entity';
import { ReturnCode } from '../entities/returnCode.enum';

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

  async validate(validateObj: ValidateRequest): Promise<ReturnCode> {
    try {
      const codInfo = await this.checkCodExistence(validateObj.cod_client);

      if (validateObj.otp_pin !== codInfo.otp_pin && codInfo.auth_count <= 6) {
        if (codInfo.auth_count === 6) return ReturnCode.COD_RET_DISP_BLOQUEADO;

        codInfo.auth_count += 1;
        this.updateAuthCount(codInfo);

        return ReturnCode.COD_RET_PIN_INVALIDO;
      }

      if (codInfo.auth_count === 5) {
        codInfo.auth_count += 1;
        this.updateAuthCount(codInfo);

        return ReturnCode.COD_RET_PENULTIMA_TENTATIVA;
      }

      return ReturnCode.COD_RET_OK;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  private async updateAuthCount(otpObj: OTP) {
    await getConnection()
      .createQueryBuilder()
      .update(OTP)
      .set({ auth_count: otpObj.auth_count })
      .where('id = :id', { id: otpObj.id })
      .execute();
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
