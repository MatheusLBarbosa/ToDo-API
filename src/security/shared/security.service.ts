import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OTP } from '../entities/otp.entity';
import { getConnection, getRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OtpResponse } from '../entities/otpResponse.entity';
import { ValidateRequest } from '../entities/validateRequest.entity';
import { ReturnCode } from '../entities/returnCode.enum';
import * as RetCodJson from '../shared/retcod.json';

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

  async validate(validateObj: ValidateRequest): Promise<any> {
    try {
      const codInfo = await this.checkCodExistence(validateObj.cod_client);
      //Data + Hora Chumbada.
      //Em busca de uma forma para obter exatamente a mesma data do Banco.
      const date = new Date('09/09/2020 01:51:30 AM');

      //console.log((date.getUTCHours() + ':' + date.getUTCMinutes() + ':' + date.getUTCSeconds()));

      if (date.toLocaleTimeString() > codInfo.expiredAt.toLocaleTimeString()) {
        codInfo.auth_count += 1;
        this.updateAuthCount(codInfo);

        return RetCodJson.Pin_Expirado;
      }

      if (validateObj.otp_pin !== codInfo.otp_pin && codInfo.auth_count <= 6) {
        if (codInfo.auth_count === 6) return RetCodJson.Disp_Bloqueado;

        codInfo.auth_count += 1;
        this.updateAuthCount(codInfo);

        return RetCodJson.Auth_Invalida;
      }

      if (codInfo.auth_count === 5) {
        codInfo.auth_count += 1;
        this.updateAuthCount(codInfo);

        return RetCodJson.Penultima_Tentativa;
      }

      this.updateValidatedAt(codInfo, date);
      return RetCodJson.Auth_OK;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  private async updateValidatedAt(otpObj: OTP, validateDate: Date) {
    await getConnection()
      .createQueryBuilder()
      .update(OTP)
      .set({ validateAt: validateDate })
      .where('id = :id', { id: otpObj.id })
      .execute();
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

  private readFile() {
    const json = require('../shared/retcod.json');
  }
}
