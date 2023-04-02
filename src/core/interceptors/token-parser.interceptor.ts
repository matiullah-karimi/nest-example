import { CallHandler, ExecutionContext, NestInterceptor, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';
import { jwtConstants } from "src/auth/constants";

@Injectable()
export class ParseJwtToken implements NestInterceptor{
    constructor(private jwtService: JwtService) {}

    async intercept(context: ExecutionContext, handler: CallHandler) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

      if (!token) {
        return handler.handle();
      }

      try {
        const payload = await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret });

        request['user'] = payload;
      } catch {}

        return handler.handle();
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}