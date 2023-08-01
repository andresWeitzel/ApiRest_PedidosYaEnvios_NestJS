//Core
import { NestFactory } from '@nestjs/core';
//Modules
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Api Rest Pedidos Ya Envíos Nestjs')
    .setDescription('Api Rest para la gestión de envíos, productos, puntos, rutas, etc, ejemplificando parte de la arquitectura de desarrollo de PedidosYa Envíos implementado con NestJS, NodeJS, TypeORM, dotenv, cors, swagger, swagger-ui, MySQL, otros.')
    .setVersion('1.0')
    .addTag('products')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/doc/api-swagger', app, document);

  await app.listen(3002);
}
bootstrap();