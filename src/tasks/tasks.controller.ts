import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { TaskService } from './shared/task.service';
import { Task } from './entities/task.entity';
import {
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiAcceptedResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TaskService) {}

  @Get()
  @ApiNoContentResponse({ description: 'There´s no tasks to show' })
  @ApiAcceptedResponse({ description: 'All tasks' })
  async getAll(): Promise<Task[]> {
    return this.taskService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Task founded' })
  @ApiParam(Param('id'))
  async getById(@Param('id') id: number): Promise<Task> {
    return await this.taskService.getById(id);
  }

  @Post()
  @ApiAcceptedResponse({ description: 'Created task' })
  @ApiOkResponse({ description: 'Create task with success' })
  @ApiBody({ type: Task })
  async create(@Body() task: Task): Promise<void> {
    await this.taskService.create(task);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Update task with success' })
  @ApiParam(Param('id'))
  @ApiBody({ type: Task })
  async update(@Param('id') id: number, @Body() task: Task): Promise<void> {
    await this.taskService.update(id, task);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Delete task with success' })
  @ApiParam(Param('id'))
  async delete(@Param('id') id: number): Promise<void> {
    this.taskService.delete(id);
  }
}
