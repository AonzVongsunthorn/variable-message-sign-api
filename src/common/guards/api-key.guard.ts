import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException, Inject,
} from '@nestjs/common';
import {API_KEY_CONF} from "@/constants";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class ApiKeyGuard implements CanActivate {
    private readonly API_KEY = this.configService.get<number>(API_KEY_CONF);
    constructor(
        @Inject(ConfigService)
        private readonly configService: ConfigService,
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const apiKey = request.headers['api-key']; // give the name you want

        if (!apiKey) {
            throw new UnauthorizedException('API key is missing.');
        }

        if (apiKey !== this.API_KEY) {
            throw new UnauthorizedException('Invalid API key.');
        }

        return true;
    }
}
