import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { HelloService } from "./hello.service";

@ApiTags("Hello")
@Controller("hello")
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get("/")
  hello() {
    return this.helloService.sayHello();
  }
}
