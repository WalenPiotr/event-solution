import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(helmet());
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Event API')
    .setDescription('The event API description')
    .setVersion('1.0')
    .addTag('api', 'solution')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // share swagger docs on one of the endpoints
  app.use('/v1/swagger.json', (_, res) => res.send(document));

  await app.listen(4000);
}
bootstrap();
