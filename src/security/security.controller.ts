import { Controller, Body, Post, Res, HttpStatus, HttpCode } from '@nestjs/common';
import { SecurityService } from './shared/security.service';
import { ApiAcceptedResponse, ApiOkResponse, ApiBody, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { OTP } from './entities/otp.entity';
import { OtpResponse } from './entities/otpResponse.entity';
import { OtpRequest } from './entities/otpRequest.entity';
import { ValidateRequest } from './entities/validateRequest.entity';
import {Response} from 'express';
import { ReturnCode } from './entities/returnCode.enum';
import { ValidateResponse } from './entities/validateResponse.entity';

@Controller('password')
export class SecurityController {
  constructor(private securityService: SecurityService) {}

  @Post('/create')
  @ApiAcceptedResponse({ description: 'Create an new OTP' })
  @ApiOkResponse({ description: 'Create OTP with success' })
  @ApiBody({ type: OtpRequest })
  async create(@Body() otp: OTP): Promise<OtpResponse> {
    return await this.securityService.create(otp);
  }

  @Post('/validate')
  @HttpCode(200)
  @ApiCreatedResponse({ description: 'PIN validado com sucesso' })
  @ApiBody({ type: ValidateRequest })
  async validate(@Body() validateObj: ValidateRequest): Promise<any> {
    return await this.securityService.validate(validateObj);
  }
}
