import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Category } from 'src/modules/category/entities/category.entity';
import { Task } from 'src/modules/task/entities/task.entity';
import { User } from 'src/modules/user/entities/user.entity';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'task-dev',
  entities: [User, Task, Category],
  synchronize: true,
};

export default config;
