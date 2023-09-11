import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import {
  AuthAnswerDto,
  LoginDto,
  SignUpDto,
  WhoAmIAnswerDto,
} from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Access token',
    type: AuthAnswerDto,
    isArray: false,
  })
  @Post('login')
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn({
      email: signInDto.email,
      pass: signInDto.pass,
    });
  }

  @UseGuards(AuthGuard)
  @Get('whoAmI')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'User info',
    type: WhoAmIAnswerDto,
    isArray: false,
  })
  getProfile(@Request() req) {
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('signUp')
  @ApiOkResponse({
    description: 'Access token',
    type: AuthAnswerDto,
    isArray: false,
  })
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
