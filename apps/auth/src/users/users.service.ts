import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { UsersRepository } from "./repositories/users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async tryToRegister(user: User): Promise<boolean> {
    const existUser = await this.findOneByEmail(user.email);
    console.log("existUser", existUser);
    if (!existUser) {
      console.log("creaetuser", user);
      await this.createUser(user);
    }

    return true;
  }
  async createUser(request: User) {
    console.log("request", request);
    const user = await this.usersRepository.create(request);

    console.log("user", user);

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    return user;
  }

  async validateUser(email: string) {
    const user = await this.findOneByEmail(email);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
