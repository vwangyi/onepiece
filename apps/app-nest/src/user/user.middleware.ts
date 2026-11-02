import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  @Inject(UserService)
  private userService: UserService;

  use(req: Request, res: Response, next: NextFunction) {
    console.log('user中间件 before');
    next();
    console.log('user中间件 after');
  }
}
