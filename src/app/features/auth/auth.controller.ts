import { CookieOptions, Response } from "express";
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";

import { AuthService } from "./auth.service";
import { SignUpDTO } from "@features/users/dto/signup.dto";
import { SignInDTO } from "@features/users/dto/signin.dto";
import { EnvSchemaType } from "@core/config/env-validation.schema";
import { GoogleAuthGuard } from "@core/guards/google-auth.guard";
import { User } from "@features/users/entities/user.entity";
import { Request } from "@shared/models/Request";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService<EnvSchemaType, true>,
  ) {}

  private readonly cookieConfig: CookieOptions = {
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

  @Get("google")
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {
    // guard will redirect google automatically
  }

  @Get("google/callback")
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    // req.user set by GoogleStartegy.validate()
    const user = req.user;

    const { token } = await this.authService.issueJwtForUser(user as User);

    res.cookie("access_token", token, this.cookieConfig);
    return res.redirect(this.configService.get("CLIENT_SUCCESS_REDIRECT"));
  }
}
