import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";

type Request = ExpressRequest & {
  start: number;
};

type Response = ExpressResponse;

export { Request, Response };
