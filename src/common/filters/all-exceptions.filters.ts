import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>();

        const status = exception instanceof HttpException 
                        ? exception.getStatus()
                        : HttpStatus.INTERNAL_SERVER_ERROR;
        
        const message = exception instanceof HttpException
                        ? exception.message
                        : 'Internal server error';

        response.status(status).json({statusCode: status, message, from:'all exceptions filter we built'});
    }
}