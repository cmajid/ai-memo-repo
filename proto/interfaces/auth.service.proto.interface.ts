import { Observable } from "rxjs";
import { User } from "./user.proto.type";

export default interface IProtoAuthService {
  ValidateUser({ email }: { email: string }): Observable<User>;
}
