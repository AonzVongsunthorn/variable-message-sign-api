import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
    Inject,
    InternalServerErrorException, UnauthorizedException
} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import { CENTRAL_AUTH_API } from "@/constants";
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DefaultJWTGuard implements CanActivate {
    private readonly CENTRAL_AUTH_API = this.configService.get<number>(CENTRAL_AUTH_API);
    constructor(
        @Inject(ConfigService)
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        if (!authHeader) {
            throw new ForbiddenException('No Authorization header');
        }

        try {
            const { data } = await firstValueFrom(
                this.httpService.get(this.CENTRAL_AUTH_API+'/auth/me', {
                    headers: { Authorization: authHeader },
                }),
            );
            // Optionally attach user info to request
            if (!data.isAlive) {
                throw new UnauthorizedException('Token was expired');
            }
            request.user = data;
            return true;
        } catch (error) {
            console.error('Authentication error:', error);
            throw new UnauthorizedException(`Error during validate with Central Auth API (${this.CENTRAL_AUTH_API}): ${error.message}`);
        }
    }
}