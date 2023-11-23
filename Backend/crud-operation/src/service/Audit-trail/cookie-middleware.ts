/* eslint-disable prettier/prettier */
// cookie-middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
 
@Injectable()
export class CookieMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Set Secure and HttpOnly flags
    res.cookie('myCookie', 'myValue', { secure: true, httpOnly: true });

    // Set SameSite attribute
    // res.cookie('myCookie', 'myValue', { sameSite: 'None' });

    // Set Domain restriction
    res.cookie('myCookie', 'myValue', { domain: 'example.com' });

    // Set expiration time
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1); // One year from now
    res.cookie('myCookie', 'myValue', { expires: expirationDate });

    next();
  }
}
