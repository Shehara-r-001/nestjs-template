import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";

@Injectable()
export class ExceptionsService {
  constructor(private readonly logger: Logger) {}

  throwNotFoundError<T>(
    data: T | null | undefined,
    message: string = "resource not found",
  ): asserts data is T {
    if (!data) {
      this.logger.error(message);
      throw new NotFoundException(message);
    }
  }

  throwCustomError(statusCode: number, message: string) {
    this.logger.error(message);
    throw new HttpException(message, statusCode);
  }

  throwBadRequestError(message = "Bad request") {
    this.logger.error(message);
    throw new HttpException(message, HttpStatus.BAD_REQUEST);
  }
}
