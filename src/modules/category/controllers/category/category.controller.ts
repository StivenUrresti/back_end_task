import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../entities/category.entity';
import { CategoryDto } from '../../dto/categoryDto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('category')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':userId')
  async findAll(@Param('userId') userId: number): Promise<Category[]> {
    return await this.categoryService.findAll(userId);
  }

  @Get(':userId/:categoryId')
  async findById(
    @Param('userId') userId: number,
    @Param('categoryId') categoryId: number,
  ): Promise<Category> {
    return await this.categoryService.findById(userId, categoryId);
  }

  @Post(':userId')
  async create(
    @Param('userId') userId: number,
    @Body() createCategoryDto: CategoryDto,
  ): Promise<Category> {
    return await this.categoryService.create(userId, createCategoryDto);
  }

  @Put(':userId/:categoryId')
  async update(
    @Param('userId') userId: number,
    @Param('categoryId') categoryId: number,
    @Body() updateCategoryDto: CategoryDto,
  ): Promise<Category> {
    return await this.categoryService.update(
      userId,
      categoryId,
      updateCategoryDto,
    );
  }

  @Delete(':userId/:categoryId')
  async remove(
    @Param('userId') userId: number,
    @Param('categoryId') categoryId: number,
  ): Promise<void> {
    await this.categoryService.remove(userId, categoryId);
  }
}
