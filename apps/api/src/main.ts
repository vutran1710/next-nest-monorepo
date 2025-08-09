import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Allow CORS for all origins
  app.enableCors({
    origin: '*',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
