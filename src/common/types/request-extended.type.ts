import { Request } from 'express';
import { UserRequest } from './user-request.type';

export type RequestExtended = Request & {
  user?: UserRequest;
};
