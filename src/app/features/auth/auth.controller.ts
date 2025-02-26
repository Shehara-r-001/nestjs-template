import { CookieOptions, Response } from "express";
import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";

import { AuthService } from "./auth.service";
import { SignUpDTO } from "@features/users/dto/signup.dto";
import { SignInDTO } from "@features/users/dto/signin.dto";
import { EnvSchemaType } from "@core/config/env-validation.schema";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService<EnvSchemaType, true>,
  ) {}

  private cookieConfig: CookieOptions = {
    httpOnly: true,
    secure: this.configService.get("NODE_ENV") === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  @ApiBody({
    type: SignUpDTO,
    description: "User login credentials",
  })
  @Post("signup")
  async signup(@Body() signupDTO: SignUpDTO, @Res() res: Response) {
    const { token } = await this.authService.signUp(signupDTO);

    res.cookie("access_token", token, this.cookieConfig);

    // console.log(res);

    return res
      .status(HttpStatus.CREATED)
      .json({ message: "signed up successfully" });
  }

  @ApiBody({
    type: SignInDTO,
    description: "User login credentials",
  })
  @Post("signin")
  async signin(@Body() signinDTO: SignInDTO, @Res() res: Response) {
    const { token } = await this.authService.login(signinDTO);

    res.cookie("access_token", token, this.cookieConfig);

    return res.status(HttpStatus.OK).json({ message: "login successfully" });
  }
}
