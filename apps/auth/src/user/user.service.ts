import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "./repositories/user.repository";
import { User } from "./schemas/user.schema";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject("USER_SERVICE") private readonly userServiceRmqClient: ClientProxy,
  ) {}

  async tryToRegister(user: User): Promise<boolean> {
    const existUser = await this.findOneByEmail(user.email);
    if (!existUser) {
      await this.createUser(user);
    }

    return true;
  }
  async createUser(request: User) {
    const user = await this.userRepository.create(request);
    this.userServiceRmqClient.emit("user_created", user);
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    return user;
  }

  async validateUser(email: string) {
    const user = await this.findOneByEmail(email);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
