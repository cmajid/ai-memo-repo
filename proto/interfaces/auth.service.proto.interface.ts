import { Observable } from "rxjs";
import { User } from "./user.proto.type";

export default interface IProtoAuthService {
  ValidateUser({ email }: { email: string }): Observable<User>;
  Login(user: User): Observable<LoginResponse>;
}

export type LoginResponse = {
  token: string;
};
