import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './services/task/task.service';
import { TaskController } from './controllers/task/task.controller';
import { Task } from './entities/task.entity';
import { Category } from '../category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Category])],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
