import { Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: "majid",
      email: "majid.mjh@gmail.com",
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

  addUser(user: User): User {
    user.id = this.users.length + 1;
    this.users.push(user);
    return user;
  }
}
