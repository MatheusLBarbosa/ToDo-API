import { Module } from '@nestjs/common';
import { SecurityService } from './shared/security.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityController } from './security.controller';
import { OTP } from './entities/otp.entity';
import { OTPSchema } from './schemas/otp.schema';

@Module({
  imports: [TypeOrmModule.forFeature([OTP])],
  controllers: [SecurityController],
  providers: [SecurityService],
  exports: [SecurityService, TypeOrmModule],
})
export class SecurityModule {}
