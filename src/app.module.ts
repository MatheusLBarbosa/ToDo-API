import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TasksController } from './tasks/tasks.controller';
import { TaskService } from './tasks/shared/task.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/entities/task.entity';
import { SecurityModule } from './security/security.module';
import { SecurityService } from './security/shared/security.service';
import { OTP } from './security/entities/otp.entity';
import { Config } from './security/entities/config.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: 'localhost',
      port: 1521,
      username: 'admin',
      password: 'admin',
      database: 'oracle-xe',
      sid: 'xe',
      entities: [Task, OTP, Config],
      synchronize: true,
      dropSchema: false,
      logging: true,
    }),
    TasksModule,
    SecurityModule,
  ],
  controllers: [TasksController],
  providers: [TaskService, SecurityService],
})
export class AppModule {}
