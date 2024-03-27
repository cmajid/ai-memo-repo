import { User } from "apps/auth/src/user/schemas/user.schema";
import { Observable } from "rxjs";

export default interface IProtoUserService {
  ValidateUser({ email }: { email: string }): Observable<User>;

  FindOneUser({ id }: { id: string }): Observable<User>;
}
