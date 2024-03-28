import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import { User } from "./user/schemas/user.schema";
import { UserService } from "./user/user.service";
import { AuthTokenVerifyRequestDto } from "./dto/auth-token-verify-request.dto";
import { get } from "env-var";

@Injectable()
export class AuthService {
  private readonly client = new OAuth2Client(
    get("google_client_id").required().asString()
  );
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  login(user: User) {
    const verify = this.userService.tryToRegister(user);
    if (!verify) throw new BadRequestException();

    const payload = {
      userId: user.providerId,
      email: user.email,
      name: user.name,
    };
    const jwtToken = this.jwtService.sign(payload);
    return jwtToken;
  }

  async verifyToken(idToken: string) {
    const ticket = await this.client.verifyIdToken({
      idToken,
      audience: get("google_client_id").required().asString(),
    });
    const payload = ticket.getPayload();
    const user = this.mapUserEntity(payload);
    return user;
  }

  private mapUserEntity(payload: TokenPayload) {
    return {
      provider: "google",
      name: payload.name,
      email: payload.email,
      photo: payload.picture,
      providerId: payload.sub,
    } as User;
  }

  async getAccessTokenFromAppToken(body: AuthTokenVerifyRequestDto) {
    const user = await this.verifyToken(body.idToken);
    await this.userService.tryToRegister(user);
    const accessToken = this.login(user);
    return { accessToken, user };
  }
}
