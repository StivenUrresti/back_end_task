import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(userId: number): Promise<Category[]> {
    return await this.categoryRepository.find({
      where: { user: { id: userId } },
    });
  }

  async findById(userId: number, categoryId: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { user: { id: userId }, id: categoryId },
    });
    if (!category) {
      throw new NotFoundException(
        `Category with ID ${categoryId} not found for user ${userId}`,
      );
    }
    return category;
  }

  async create(userId: number, category: Partial<Category>): Promise<Category> {
    const newCategory = this.categoryRepository.create({
      ...category,
      user: { id: userId },
    });
    return await this.categoryRepository.save(newCategory);
  }

  async update(
    userId: number,
    categoryId: number,
    updateCategoryDto: Partial<Category>,
  ): Promise<Category> {
    const category = await this.findById(userId, categoryId);
    return await this.categoryRepository.save({
      ...category,
      ...updateCategoryDto,
    });
  }

  async remove(userId: number, categoryId: number): Promise<void> {
    const category = await this.findById(userId, categoryId);
    await this.categoryRepository.remove(category);
  }
}
