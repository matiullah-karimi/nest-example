import { ExecutionContext, NestInterceptor, CallHandler } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { map } from 'rxjs';

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {}

    intercept(context: ExecutionContext, handler: CallHandler) {
        return handler.handle().pipe(
            map((data: any) => {
                return plainToInstance(this.dto, data, {excludeExtraneousValues: true});
            })
        )
    }
}