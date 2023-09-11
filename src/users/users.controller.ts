import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Role } from 'src/auth/roles.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(RoleGuard)
  @Role('ADMINISTRATOR')
  @ApiOkResponse({
    description: 'All users',
    type: UserDto,
    isArray: true,
  })
  getAllUsers() {
    return this.usersService.findAll();
  }
}
