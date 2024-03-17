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
  getAccessToken(userId: string) {
    const newSignedPayload = { userId };
    const options = { expiresIn: "1h" }; // Token expiration time

    const accessToken = this.jwtService.sign(newSignedPayload, options);
    return accessToken;
  }
}
