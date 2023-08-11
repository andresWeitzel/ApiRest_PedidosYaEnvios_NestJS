/* eslint-disable prettier/prettier */
//External
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
//Services
import { ProductsService } from './products.service';
//Models
import { Product } from './models/product.entity';
import { ProductDTO } from './models/product.dto';
//Enums
import { ProductType } from './enums/productType';

/**
 * @description Product controller for all crud operations
 * @param {Object} event Object type
 */
@Controller('products')
@ApiTags('ProductsController')
export class ProductsController {
  constructor(private productsService: ProductsService) {}



    /**
   * @description Controller to add a product to database
   * @param {ProductDTO} newProduct ProductDTO type
   * @returns a response with the products paginated list and status code
   */
    @Post('/')
    @ApiOperation({ summary: 'Add a product to database' })
    async createProduct(
      @Body() newProduct: ProductDTO
    ): Promise<Product> {
      try {
        return await this.productsService.createProduct(newProduct);
      } catch (error) {
        console.log(`Error in createProduct controller. Caused by ${error}`);
      }
    }

  /**
   * @description Controller to get a paginated listing of all products
   * @queryParam limit: number
   * @queryParam orderBy: string
   * @queryParam orderAt: string
   * @returns a response with the products paginated list and status code
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
  @ApiOperation({
    summary: 'Get a product according to the id passed as a parameter',
  })
  async getByIdProduct(@Param('inputId') inputId: number): Promise<Product> {
    try {
      return await this.productsService.getByIdProduct(inputId);
    } catch (error) {
      console.log(`Error in getByIdProduct controller. Caused by ${error}`);
    }
  }

  /**
   * @description Controller to get a product according to the description passed as a parameter
   * @param {string} inputDescription string type
   * @queryParam limit: number
   * @queryParam orderBy: string
   * @queryParam orderAt: string
   * @returns a response with the products paginated list and status code
   */
  @Get('/description/:inputDescription')
  @ApiOperation({
    summary: 'Get a product according to the description passed as a parameter',
  })
  async getByDescriptionProducts(
    @Param('inputDescription') inputDescription: string,
    @Query('limit') limit: number,
    @Query('orderBy') orderBy: string,
    @Query('orderAt') orderAt: string,
  ): Promise<Product[]> {
    try {
      return await this.productsService.getByDescriptionProducts(
        inputDescription,
        limit,
        orderBy,
        orderAt,
      );
    } catch (error) {
      console.log(
        `Error in getByDescriptionProducts controller. Caused by ${error}`,
      );
    }
  }

  /** 
   * @description Controller to get a product according to the product type enum passed as a parameter
   * @param {enum} inputProductType enum type
   * @queryParam limit: number
   * @queryParam orderBy: string
   * @queryParam orderAt: string
   * @returns a response with the products paginated list and status code
   */
  @Get('/product-type/:inputProductType')
  @ApiOperation({
    summary:
      'Get a product according to the product type enum passed as a parameter',
  })
  async getByProductTypeProducts(
    @Param('inputProductType') inputProductType: ProductType,
    @Query('limit') limit: number,
    @Query('orderBy') orderBy: string,
    @Query('orderAt') orderAt: string,
  ): Promise<Product[]> {
    try {
      return await this.productsService.getByProductTypeProducts(
        inputProductType,
        limit,
        orderBy,
        orderAt,
      );
    } catch (error) {
      console.log(
        `Error in getByProductTypeProducts controller. Caused by ${error}`,
      );
    }
  }
}
