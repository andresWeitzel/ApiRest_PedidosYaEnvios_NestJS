import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//External
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
