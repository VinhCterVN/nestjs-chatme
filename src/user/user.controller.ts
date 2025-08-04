import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserInput } from 'src/user/dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }
  
  @Get('/findName/:name')
  async findUsersByName(@Param('name') name: string) {
    return this.userService.findByName(name);
  }
  
  @Post()
  async createUser(
    @Body() user: CreateUserInput,
  ) {
    return this.userService.createUser(user);
  }
  
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
