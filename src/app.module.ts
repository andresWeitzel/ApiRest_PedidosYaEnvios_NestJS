import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//External
import { ProductsModule } from './products/products.module';
import { WaypointsModule } from './waypoints/waypoints.module';

@Module({
  imports: [ProductsModule, WaypointsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
