import { ArgumentsHost, Catch, ExceptionFilter, HttpCode, HttpStatus } from "@nestjs/common";
import mongoose from "mongoose";
import { Response } from "express";
import { buildErrorResponse } from "./error.response.js";

@Catch(mongoose.mongo.MongoServerError)
export class MongoDuplicateUsernameFilter implements ExceptionFilter{
    catch(exception: InstanceType<typeof mongoose.mongo.MongoServerError>, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>();

        if (exception.code === 11000) {
            response.status(HttpStatus.CONFLICT).json(buildErrorResponse(HttpStatus.CONFLICT, 'Username already taken'));
            return;
        }

        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'sorry we blew up'))
    }
}