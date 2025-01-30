import {
  Injectable,
  NestInterceptor,
  Logger,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { map, tap, Observable } from "rxjs";

import { Payload, PAYLOAD_STATUS } from "src/app/shared/models/Payload";
import { Request, Response } from "src/app/shared/models/Request";

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, Payload<T | null>>
{
  private readonly logger = new Logger(ResponseInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Payload<T | null>> {
    context.switchToHttp().getRequest<Request>().start = Date.now();

    return next.handle().pipe(
      map((data: T | undefined) => ({
        status: PAYLOAD_STATUS.SUCCESS,
        message: null,
        data:
          typeof data !== "undefined" && typeof data !== "function"
            ? data
            : null,
      })),
      tap(() => {
        const request = context.switchToHttp().getRequest<Request>();
        const method = request.method.toUpperCase();
        const path = request.path.toLowerCase();
        const status = context
          .switchToHttp()
          .getResponse<Response>().statusCode;
        const time = request.start ? Date.now() - request.start : 0;

        this.logger.log(`${method} ${path} => ${status}. ( ${time} ms)`);
      }),
    );
  }
}
