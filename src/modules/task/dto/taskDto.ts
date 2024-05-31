import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';

// Enum para los posibles valores de status
export enum TaskStatus {
  DONE = 'done',
  NOT_DONE = 'not_done',
}

export class TaskDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: TaskStatus, default: TaskStatus.NOT_DONE })
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
