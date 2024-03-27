import { JwtModuleAsyncOptions } from "@nestjs/jwt";
import { get } from "env-var";

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: get("secret_key").required().asString(), 
      signOptions: {
        expiresIn: "1h",
      },
    };
  },
};