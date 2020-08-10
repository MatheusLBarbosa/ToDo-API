import { EntitySchema } from 'typeorm';
import { Task } from '../entities/task.entity';

export const TaskSchema = new EntitySchema<Task>({
    name: 'Task',
    target: Task,
    columns: {
      id: {
        type: Number,
        primary: true,
        generated: "increment",
      },
      description: {
        type: String,
      },
      completed: {
        type: Boolean,
        default: false,
      },
    }
  });