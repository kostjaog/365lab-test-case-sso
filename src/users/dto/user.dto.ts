import { ApiProperty } from '@nestjs/swagger';
import { USER_ROLE } from '@prisma/client';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: USER_ROLE;
}
