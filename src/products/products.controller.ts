/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Query } from '@nestjs/common';
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

    /**
   * @description Controller to get a product according to the id passed as a parameter
   * @param {number} inputId number type
   * @returns a response with the product and status code
   */
    @Get('/id/:inputId')
    @ApiOperation({ summary: 'Get a product according to the id passed as a parameter' })
    async getByIdProduct(
      @Param('inputId') inputId : number
    ): Promise<Product> {
      try {
        return await this.productsService.getByIdProduct(inputId);
      } catch (error) {
        console.log(`Error in getByIdProduct controller. Caused by ${error}`);
      }
    }
}
