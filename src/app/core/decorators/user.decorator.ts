// import { JwtService } from "@nestjs/jwt";
// import { ConfigService } from "@nestjs/config";
import {
  createParamDecorator,
  ExecutionContext,
  // UnauthorizedException,
} from "@nestjs/common";

// import { EnvSchemaType } from "@core/config/env-validation.schema";
// import { JwtPayload } from "@core/stratergies/jwt.stratergy";
import { Request } from "@shared/models/Request";

export const currentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();

    if (!request.cookies?.access_token) {
      return null;
      // throw new UnauthorizedException();
    } else {
      //   const jwtService = new JwtService();
      //   const configService = new ConfigService<EnvSchemaType, true>();

      //   const token = request.cookies?.access_token; // eslint-disable-line

      //   const payload: JwtPayload = await jwtService.verifyAsync(token, {
      //     secret: configService.get<string>("JWT_SECRET"),
      //   });

      //   return payload;
      return request.user;
    }
  },
);
