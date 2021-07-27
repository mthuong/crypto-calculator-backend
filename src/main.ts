import { AppModule } from '@modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';

const isSwaggerEnabled = process.env.ENABLED_SWAGGER === 'true' || process.env.NODE_ENV == 'development';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (isSwaggerEnabled) {
    const config = new DocumentBuilder()
      .setTitle('Crypto Saving Calculator')
      .setDescription('The crypto API description')
      .setVersion('1.0')
      .addTag('Crypto')
      .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
      forbidUnknownValues: false,
    }),
  );

  // Link DI container to class-validator
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);
}

bootstrap();
