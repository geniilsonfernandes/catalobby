import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthType } from './dto/auth.type';

import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { AuthInput } from './dto/auth.input';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(data: AuthInput): Promise<AuthType> {
    const user = await this.userService.findUserByEmail(data.email);

    const valid = bcrypt.compareSync(data.password, user.password);

    if (!valid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const token = await this.jwtToken(user);

    return {
      user,
      token,
    };
  }

  private async jwtToken(user: User): Promise<string> {
    const payload = {
      name: user.name,
      sub: user.id,
    };

    return this.jwtService.signAsync(payload);
  }
}
