import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request } from 'express';
import { jwtConstants } from "src/auth/constants";

@Injectable()
export class ParseJwtToken implements NestMiddleware {
  constructor(private jwtService: JwtService) { }

  async use(request: Request, response: Response, next: NextFunction) {
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      return next();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret });

      request['payload'] = payload;
    } catch { }

    return next();
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}