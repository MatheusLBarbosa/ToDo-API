import { Module } from '@nestjs/common';
import { SecurityService } from './shared/security.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [],
  controllers: [],
  providers: [SecurityService],
  exports: [SecurityService]
})
export class SecurityModule {}
