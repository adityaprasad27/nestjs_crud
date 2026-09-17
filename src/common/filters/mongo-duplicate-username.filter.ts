import { ArgumentsHost, Catch, ExceptionFilter, HttpCode, HttpStatus } from "@nestjs/common";
import mongoose from "mongoose";
import { Response } from "express";

@Catch(mongoose.mongo.MongoServerError)
export class MongoDuplicateUsernameFilter implements ExceptionFilter{
    catch(exception: InstanceType<typeof mongoose.mongo.MongoServerError>, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>();

        if (exception.code === 11000) {
            response.status(HttpStatus.CONFLICT).json({
                statusCode: HttpStatus.CONFLICT,
                message: 'Username already taken',
                from: 'sent from samsung fridge'
            });
            return;
        }

        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'We blew up lol',
            fromt: 'sent from kabol'
        })
    }
}