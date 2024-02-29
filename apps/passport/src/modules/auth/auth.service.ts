import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
   private jwtService: JwtService,
  ) {}

  generateToken(user: User) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  validateUser(email: string) {
    const user = this.userService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
