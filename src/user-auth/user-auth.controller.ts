import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';

@Controller('users-auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Get()
  async findAll() {
    return this.userAuthService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return this.userAuthService.findOneById(id);
  }

  @Get('/findName/:name')
  async findUsersByName(@Param('name') name: string) {
    return this.userAuthService.findByName(name);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userAuthService.deleteUser(id);
  }
}
