import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { SALT_ROUNDS } from '../core/config';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { LoginDto, SignUpDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async signIn({ email, pass }: LoginDto): Promise<{ access_token: string }> {
    const candidate = await this.usersService.findOne(email);
    if (!candidate || (await bcrypt.compare(candidate.password, pass))) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: candidate.id,
      email: candidate.email,
      role: candidate.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(userData: SignUpDto): Promise<{ access_token: string }> {
    const candidate = await this.usersService.findOne(userData.email);
    if (candidate) {
      throw new HttpException('User already exists.', HttpStatus.CONFLICT);
    }
    const user = await this.prisma.user.create({
      data: {
        ...userData,
        password: await bcrypt.hash(userData.password, SALT_ROUNDS),
      },
    });
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
