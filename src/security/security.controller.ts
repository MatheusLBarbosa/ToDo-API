import { Controller, Body, Post } from '@nestjs/common';
import { SecurityService } from './shared/security.service';
import { ApiAcceptedResponse, ApiOkResponse, ApiBody, ApiResponse } from '@nestjs/swagger';
import { OTP } from './entities/otp.entity';
import { OtpResponse } from './entities/otpResponse.entity';
import { OtpRequest } from './entities/otpRequest.entity';

@Controller('password')
export class SecurityController {
  constructor(private securityService: SecurityService) {}

  @Post('/create')
  @ApiAcceptedResponse({ description: 'Create an new OTP' })
  @ApiOkResponse({ description: 'Create OTP with success' })
  @ApiBody({ type: OtpRequest })
  @ApiOkResponse({type: OtpResponse})
  async create(@Body() otp: OTP): Promise<OtpResponse> {
    return await this.securityService.create(otp);
  }
}
