import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(userId: number): Promise<Task[]> {
    return await this.taskRepository.find({ where: { user: { id: userId } } });
  }

  async findById(userId: number, taskId: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { user: { id: userId }, id: taskId },
    });
    if (!task) {
      throw new NotFoundException(
        `Task with ID ${taskId} not found for user ${userId}`,
      );
    }
    return task;
  }

  async create(
    userId: number,
    categoryId: number,
    task: Partial<Task>,
  ): Promise<Task> {
    const newTask = this.taskRepository.create({
      ...task,
      user: { id: userId },
      category: { id: categoryId },
    });
    return await this.taskRepository.save(newTask);
  }

  async update(
    userId: number,
    taskId: number,
    updateTaskDto: Partial<Task>,
  ): Promise<Task> {
    const task = await this.findById(userId, taskId);
    return await this.taskRepository.save({ ...task, ...updateTaskDto });
  }

  async remove(userId: number, taskId: number): Promise<void> {
    const task = await this.findById(userId, taskId);
    await this.taskRepository.remove(task);
  }
}
