import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TaskService } from './shared/task.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskSchema } from './schemas/task.schema';
import { Task } from './entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskSchema])
  ],
  controllers: [TasksController],
  providers: [TaskService],
  exports: [TaskService, TypeOrmModule]
})
export class TasksModule {}
