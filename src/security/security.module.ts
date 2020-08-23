import { Module } from '@nestjs/common';
import { SecurityService } from './shared/security.service';

@Module({
  providers: [SecurityService]
})
export class SecurityModule {}
