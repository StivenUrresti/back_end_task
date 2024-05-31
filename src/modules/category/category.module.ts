import { Module } from '@nestjs/common';
import { CategoryService } from './services/category/category.service';
import { CategoryController } from './controllers/category/category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
