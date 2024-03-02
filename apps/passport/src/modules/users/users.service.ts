import { Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: "majid",
      email: "majid@memo.app",
    },
    {
      id: 2,
      name: "maryam",
      email: "maryam@memo.app",
    },
  ];

  findOneByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }
}
