import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TasksController } from './tasks/tasks.controller';
import { TaskService } from './tasks/shared/task.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/entities/task.entity';
import { TaskSchema } from './tasks/schemas/task.schema';

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
      entities: [Task],
      synchronize: true,
      dropSchema: false,
      logging: true,
    }),
    TasksModule,
  ],
  controllers: [TasksController],
  providers: [TaskService],
})
export class AppModule {}
