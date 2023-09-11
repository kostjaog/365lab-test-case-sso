import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail(
    {},
    {
      message: 'Invalid email address',
    },
  )
  @IsNotEmpty()
  @ApiProperty({
    example: 'test@test.com',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'qwertyt',
  })
  pass: string;
}

export class SignUpDto {
  @ApiProperty({
    example: 'Bob',
  })
  name: string;

  @ApiProperty({
    example: 'test@test.com',
  })
  @IsEmail(
    {},
    {
      message: 'Invalid email address',
    },
  )
  email: string;

  @ApiProperty({
    example: 'qwertyt',
  })
  @MinLength(5, {
    message: 'Password needs to be minimum 5 characters.',
  })
  password: string;
}

export class AuthAnswerDto {
  @ApiProperty()
  access_token: string;
}

export class WhoAmIAnswerDto {
  @ApiProperty()
  sub: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  iat: string;

  @ApiProperty()
  exp: string;
}
