import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ProductsProviders } from './products.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...ProductsProviders, ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
