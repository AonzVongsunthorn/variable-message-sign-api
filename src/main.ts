import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { APP_NAME_ENV_CONF, CORS_CONF, HOST_CONF, PORT_CONF } from '@/constants';
import { AppModule } from "@/app.module";

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const appName: number = config.get<number>(APP_NAME_ENV_CONF);
  const host: string = config.get<string>(HOST_CONF);
  const port: number = config.get<number>(PORT_CONF);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors({
    origin: "*",
  });
  await app.listen(port, () => {
    console.log(appName, `${host}:${port}`);
  });
}

bootstrap();
