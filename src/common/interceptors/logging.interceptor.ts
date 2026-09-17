import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Request } from "express";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest<Request>();
        const start = Date.now();

        return next.handle().pipe(
            tap({
                next: () => {
                    const duration = Date.now() - start;
                    console.log(`success: ${request.method} ${request.url} - took ${duration} ms`)
                },
                error: () => {
                    console.log(`error: ${request.method} ${request.url} -- took ${Date.now() - start} ms`)
                }
            })
        )
    }
}