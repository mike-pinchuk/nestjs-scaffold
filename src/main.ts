import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { expressMiddleware } from 'cls-rtracer';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpStatus, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Todos')
    .setDescription('TODOS API enpoints description')
    .setVersion('1.0')
    .addTag('todos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  app.use(expressMiddleware());
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );

  await app.listen(3000);
}
bootstrap();
