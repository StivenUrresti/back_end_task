import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../entities/task.entity';
import { UpdateTaskStatusDto } from '../../dto/taskDto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(userId: number): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { user: { id: userId } },
      relations: ['category'],
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        category: {
          id: true,
        },
      },
    });
  }

  async findById(userId: number, taskId: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { user: { id: userId }, id: taskId },
      relations: ['category'],
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        category: {
          id: true,
        },
      },
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
    try {
      if (!task.title || !task.description) {
        throw new Error('El título y la descripción son campos requeridos');
      }

      const newTask = this.taskRepository.create({
        ...task,
        user: { id: userId },
        category: { id: categoryId },
      });

      const savedTask = await this.taskRepository.save(newTask);

      if (!savedTask) {
        throw new Error('La tarea no pudo ser creada');
      }

      return savedTask;
    } catch (error) {
      throw new Error('Error al crear la tarea: ' + error.message);
    }
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

  async updateTaskStatus(
    userId: number,
    taskId: number,
    updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    const task = await this.taskRepository.findOne({
      where: { id: taskId, user: { id: userId } },
      relations: ['user'],
    });

    if (!task) {
      throw new NotFoundException(`Task with ID "${taskId}" not found`);
    }

    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
