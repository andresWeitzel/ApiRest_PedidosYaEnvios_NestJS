/* eslint-disable prettier/prettier */
//External
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
//Services
import { ProductsService } from './products.service';
//Models
import { Product } from './models/product.entity';
import { ProductDTO } from './models/product.dto';
//Enums
import { ProductType } from './enums/productType';
//Utils
import { ExceptionHandling } from 'src/utils/http-exception/exception-handling';
import { error } from 'console';
//Const-vars
let newProduct;
let exceptionHandling;

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
    @Body() newProduct: ProductDTO,
  ): Promise<Product | ExceptionHandling> {
    try {
      //newProduct = await this.productsService.createProduct(newProduct);
      newProduct = null;

      if (newProduct != (null || undefined)) {
        return newProduct;
      }
      exceptionHandling = new ExceptionHandling(
        'The product could not be added to the database.',
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      console.log(`Error in createProduct controller. Caused by ${error}`);
      
    return exceptionHandling;
    }
    return exceptionHandling;
    /*Exception filters 
    * https://www.youtube.com/watch?v=AWqqg9Dtnc4
    * https://www.youtube.com/watch?v=4akOFpItbLc
    * */
  }

  /**
   * @description Controller to update a product from database
   * @param {number} inputId number type
   * @param {ProductDTO} updateProduct ProductDTO type
   * @returns a response with the products paginated list and status code
   */
  @Patch('/:inputId')
  @ApiOperation({ summary: 'Update a product from database' })
  async updateProduct(
    @Param('inputId') inputId: number,
    @Body() updateProduct: ProductDTO,
  ): Promise<Product> {
    try {
      return await this.productsService.updateProduct(inputId, updateProduct);
    } catch (error) {
      console.log(`Error in updateProduct controller. Caused by ${error}`);
    }
  }

  /**
   * @description Controller to get a paginated listing of all products
   * @param {number} pageNro number type
   * @param {number} pageSize number type
   * @param {string} orderBy string type
   * @param {string} orderAt string type
   * @returns a response with the products paginated list and status code
   */
  @Get('/list')
  @ApiOperation({ summary: 'Get all paginated products with all properties' })
  async getAllProducts(
    @Query('pageNro') pageNro: number,
    @Query('pageSize') pageSize: number,
    @Query('orderBy') orderBy: string,
    @Query('orderAt') orderAt: string,
  ): Promise<Product[]> {
    try {
      return await this.productsService.getAllProducts(
        pageNro,
        pageSize,
        orderBy,
        orderAt,
      );
    } catch (error) {
      console.log(`Error in getAllProducts controller. Caused by ${error}`);
    }
  }

  /**
   * @description Controller to get a paginated listing of all products according to the type and value of a product
   * @param {string} filterBy string type
   * @param {string} filterValue string type
   * @param {number} pageNro number type
   * @param {number} pageSize number type
   * @param {string} orderBy string type
   * @param {string} orderAt string type
   * @returns a response with the products paginated list and status code
   */
  @Get('/list-with-filter')
  @ApiOperation({
    summary:
      'Get all paginated products products according to the type and value of a product',
  })
  async getAllFilterProducts(
    @Query('filterBy') filterBy: string,
    @Query('filterValue') filterValue: string,
    @Query('pageNro') pageNro: number,
    @Query('pageSize') pageSize: number,
    @Query('orderBy') orderBy: string,
    @Query('orderAt') orderAt: string,
  ): Promise<Product[]> {
    try {
      return await this.productsService.getAllWithFilterProducts(
        filterBy,
        filterValue,
        pageNro,
        pageSize,
        orderBy,
        orderAt,
      );
    } catch (error) {
      console.log(
        `Error in getAllFilterProducts controller. Caused by ${error}`,
      );
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
   * @param {number} pageNro number type
   * @param {number} pageSize number type
   * @param {string} orderBy string type
   * @param {string} orderAt string type
   * @returns a response with the products paginated list and status code
   */
  @Get('/description/:inputDescription')
  @ApiOperation({
    summary: 'Get a product according to the description passed as a parameter',
  })
  async getByDescriptionProducts(
    @Param('inputDescription') inputDescription: string,
    @Query('pageNro') pageNro: number,
    @Query('pageSize') pageSize: number,
    @Query('orderBy') orderBy: string,
    @Query('orderAt') orderAt: string,
  ): Promise<Product[]> {
    try {
      return await this.productsService.getByDescriptionProducts(
        inputDescription,
        pageNro,
        pageSize,
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
   * @param {ProductType} inputProductType enum type
   * @param {number} pageNro number type
   * @param {number} pageSize number type
   * @param {string} orderBy string type
   * @param {string} orderAt string type
   * @returns a response with the products paginated list and status code
   */
  @Get('/product-type/:inputProductType')
  @ApiOperation({
    summary:
      'Get a product according to the product type enum passed as a parameter',
  })
  async getByProductTypeProducts(
    @Param('inputProductType') inputProductType: ProductType,
    @Query('pageNro') pageNro: number,
    @Query('pageSize') pageSize: number,
    @Query('orderBy') orderBy: string,
    @Query('orderAt') orderAt: string,
  ): Promise<Product[]> {
    try {
      return await this.productsService.getByProductTypeProducts(
        inputProductType,
        pageNro,
        pageSize,
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
