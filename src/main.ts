import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from '#src/common/exception-handler/exception.filter';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { backendServer } from '#src/common/configs/config';
import { AppModule } from '#src/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  app.use(cookieParser());

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enable('trust proxy');
  app.enableShutdownHooks();

  const config = new DocumentBuilder()
    .setTitle('SberHack')
    .setDescription('SberHack by Shedevro')
    .setVersion('7.7.7')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(backendServer.port);
}
bootstrap();
