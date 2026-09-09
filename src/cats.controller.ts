import { Controller, Get, Req } from "@nestjs/common";
import type { Request } from 'express';

@Controller('cats')
export class CatsController {
    @Get()
    findAllCats() : string {
        return 'This function returns all cats'
    }

    @Get('orange')
    getOrangeBrainCells() : string {
        return 'Orange got -1 brain cell'
    }

    @Get('getreq')
    returnRequestObject(@Req() request: Request) : Record<string, any> {
        const body = request.body;
        const headers = request.headers;

        return {"body" : body, "headers": headers}
    }
}