import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';

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
