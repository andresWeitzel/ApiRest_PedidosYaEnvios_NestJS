/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { Product } from './models/product.entity';

/**
 * @description Product controller for all crud operations
 * @param {Object} event Object type
 */
@Controller('products')
@ApiTags('ProductsController')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  /**
   * @description Controller to get a paginated listing of all products
   * @queryParam limit: number
   * @queryParam orderBy: string
   * @queryParam orderAt: string
   * @returns a response with the user/s paginated list and status code
   */
  @Get('/list')
  @ApiOperation({ summary: 'Get all paginated products with all properties' })
  async getAllProducts(
    @Query('limit') limit: number,
    @Query('orderBy') orderBy: string,
    @Query('orderAt') orderAt: string,
  ): Promise<Product[]> {
    try {
      return await this.productsService.getAllProducts(limit, orderBy, orderAt);
    } catch (error) {
      console.log(`Error in getAllProducts controller. Caused by ${error}`);
    }
  }
}
