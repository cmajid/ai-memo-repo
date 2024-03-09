import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(accessToken: string, email: string, name: string) {
    const payload = { accessToken, email, name };
    const jwtToken = this.jwtService.sign(payload);
    return jwtToken;
  }
}
