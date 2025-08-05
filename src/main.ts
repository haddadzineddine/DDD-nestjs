import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swagger } from './configs/swagger.config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  swagger(app);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const port = configService.get('port');

  await app.listen(port, () => {
    Logger.log(`Server is running on port ${port}`, 'Bootstrap');
    Logger.log(`Swagger is running on http://localhost:${port}/api`, 'Bootstrap');
  });
}
bootstrap();
