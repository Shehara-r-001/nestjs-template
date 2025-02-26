import { JwtService } from "@nestjs/jwt";
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { EnvSchemaType } from "@core/config/env-validation.schema";
import { JwtPayload } from "@core/stratergies/jwt.stratergy";
import { Request } from "@shared/models/Request";

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService<EnvSchemaType>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest(); // eslint-disable-line

    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>("JWT_SECRET"),
      });

      request["user"] = payload; // eslint-disable-line
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractToken(request: Request): string | undefined {
    // const authHeader = request.headers.authorization?.split(" ") ?? [];

    // if (authHeader) {
    //   const [type, token] = authHeader;
    //   return type === "Bearer" ? token : undefined;
    // }

    return typeof request.cookies?.access_token === "string"
      ? request.cookies?.access_token
      : undefined;
  }
}
