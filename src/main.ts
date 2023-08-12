/* eslint-disable prettier/prettier */
//External
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //--start swagger config--
  const config = new DocumentBuilder()
    .setTitle('Api Rest Pedidos Ya Envíos Nestjs')
    .setDescription('Api Rest para la gestión de envíos, productos, puntos, rutas, etc, ejemplificando parte de la arquitectura de desarrollo de PedidosYa Envíos implementado con NestJS, NodeJS, TypeORM, dotenv, cors, swagger, swagger-ui, MySQL, otros.')
    .setVersion('1.0')
    .addTag('products')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/doc/api-swagger', app, document);
//--end swagger config--
//--start with validations--
  // enable validation globally
  // this is from NestJS docs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  // enable DI for class-validator
  // this is an important step, for further steps in this article
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
//--end with validations--

  await app.listen(3002);
}
bootstrap();