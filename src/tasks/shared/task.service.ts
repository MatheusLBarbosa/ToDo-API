import { Injectable } from '@nestjs/common';
import { Task } from '../entities/task.entity';
import { Repository, Connection, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private connection: Connection,
  ) {}

  async getAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async getById(id: number): Promise<Task> {
    return await this.taskRepository.findOne(id);
  }

  async create(task: Task): Promise<void> {
    /*const object = this.taskRepository.create(task);
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(object);

      await queryRunner.commitTransaction();
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }*/

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Task)
      .values(task)
      .execute();
  }

  async update(id: number, task: Task): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .update(Task)
      .set(task)
      .where('id = :id', { id: id })
      .execute();
  }

  async delete(id: number): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Task)
      .where('id = :id', { id: id })
      .execute();
  }
}
