import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });
  app.setGlobalPrefix('api'); 
  app.useGlobalPipes(new ValidationPipe({
    enableDebugMessages: true,
    transform: true,
  }));
  await app.listen(process.env.PORT ?? 3030);
})();
