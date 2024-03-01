import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class MagicLoginRefreshGuard extends AuthGuard("magiclogin-refresh") {}
