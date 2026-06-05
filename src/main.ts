import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );


  const config = new DocumentBuilder()
    .setTitle('API Tienda Online')
    .setDescription('Documentación de la API REST para la gestión de e-commerce')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);


  app.use(
    '/api',
    apiReference({
      spec: {
        content: document,
      },
    }),
  );


  const port = process.env.PORT || 3000;

  await app.listen(port, '0.0.0.0');
}
bootstrap();