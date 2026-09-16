import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TOKEN_SERVICE } from "./token.interface.js";
import { JwtTokenService } from "./jwt-token.service.js";


@Global()
@Module({
    imports: [
        JwtModule.registerAsync({
            // global: true, not needed as only tokenservice uses jwt           
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '600s' },
            })
        }),
    ],
    providers: [
        {provide: TOKEN_SERVICE, useClass: JwtTokenService}
    ],
    exports: [TOKEN_SERVICE],
})
export class TokenModule {};