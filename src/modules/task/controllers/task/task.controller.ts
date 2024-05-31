import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TaskService } from '../../services/task/task.service';
import { Task } from '../../entities/task.entity';
import { TaskDto } from '../../dto/taskDto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Task')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':userId')
  async findAll(@Param('userId') userId: number): Promise<Task[]> {
    return await this.taskService.findAll(userId);
  }

  @Get(':userId/:taskId')
  async findById(
    @Param('userId') userId: number,
    @Param('taskId') taskId: number,
  ): Promise<Task> {
    return await this.taskService.findById(userId, taskId);
  }

  @ApiParam({
    name: 'userId',
    required: true,
  })
  @ApiParam({
    name: 'categoryId',
    required: false,
  })
  @Post(':userId/:categoryId')
  async create(
    @Param('userId') userId: number,
    @Param('userId') categoryId: number,
    @Body() createTaskDto: TaskDto,
  ): Promise<Task> {
    return await this.taskService.create(userId, categoryId, createTaskDto);
  }

  @Put(':userId/:taskId')
  async update(
    @Param('userId') userId: number,
    @Param('taskId') taskId: number,
    @Body() updateTaskDto: TaskDto,
  ): Promise<Task> {
    return await this.taskService.update(userId, taskId, updateTaskDto);
  }

  @Delete(':userId/:taskId')
  async remove(
    @Param('userId') userId: number,
    @Param('taskId') taskId: number,
  ): Promise<void> {
    await this.taskService.remove(userId, taskId);
  }
}
