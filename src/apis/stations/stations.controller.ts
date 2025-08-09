import {  Controller,  Get, UseGuards, Headers } from '@nestjs/common';
import { DefaultJWTGuard } from "@/common/guards/default.guard";

@Controller('stations')
export class StationsController {
    @Get('me')
    @UseGuards(DefaultJWTGuard)
    private async profile(@Headers('Authorization') token: string): Promise<any> {
        const [, jwtToken] = token.split(' ');
        return { data: jwtToken }
    }
}
