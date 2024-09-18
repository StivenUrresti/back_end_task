import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { User } from '../../entities/user.entity';
import { UserDto } from '../../dto/userDto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return await this.userService.findById(+id);
  }

  @ApiParam({
    name: 'email',
    required: true,
  })
  @ApiParam({
    name: 'password',
    required: true,
  })
  @Get(':email/:password')
  async findUser(
    @Param('email') email: string,
    @Param('password') password: string,
  ): Promise<User> {
    return await this.userService.findUser(email, password);
  }

  @Post()
  async create(@Body() createUserDto: UserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UserDto,
  ): Promise<User> {
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.userService.remove(+id);
  }
}
