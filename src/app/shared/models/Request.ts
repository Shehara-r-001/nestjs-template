import { User } from "@features/users/entities/user.entity";
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";

type Request = ExpressRequest & {
  start: number;
  user?: User;
};

type Response = ExpressResponse;

export { Request, Response };
