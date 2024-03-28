import { Observable } from "rxjs";
import { User } from "./user.proto.type";

export default interface IProtoUserService {
  FindOneUser({ id }: { id: string }): Observable<User>;
}
