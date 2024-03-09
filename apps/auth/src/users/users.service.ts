import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: "majid",
      email: "majid.mjh@gmail.com",
      picture: "",
    },
    {
      id: 2,
      name: "maryam",
      email: "maryam@memo.app",
      picture: "",
    },
  ];

  findOneByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  validateUser(email: string) {
    const user = this.findOneByEmail(email);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
