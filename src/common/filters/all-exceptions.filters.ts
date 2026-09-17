import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from 'express';
import { buildErrorResponse } from "./error.response.js";
// TODO ; need to make this beter code because if add logging here then wer are coupling 
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

        response.status(status).json(buildErrorResponse(status, message));
    }
}