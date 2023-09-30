/* eslint-disable prettier/prettier */
//External
import {
  Body,
  Controller,
  Get,
  Res,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
//Services
import { ProductsService } from './products.service';
//Models
import { Product } from './models/product.entity';
import { ProductDTO } from './models/product.dto';
//Enums
import { ProductType } from './enums/productType';
//Utils
// import { ExceptionHandling } from 'src/utils/http-exception/exception-handling';
//Const-vars
let exception: any;
let msg: string;

/**
 * @description Product controller for all crud operations
 * @param {Object} event Object type
 */
@Controller('products')
@ApiTags('ProductsController')
export class ProductsController {
  constructor(private readonly  productsService: ProductsService) {}

  // /**
  //  * @description Controller to add a product to database
  //  * @param {ProductDTO} newProduct ProductDTO type
  //  * @returns a response with the products paginated list and status code
  //  */
  // @Post('/')
  // @ApiOperation({ summary: 'Add a product to database' })
  // async createProduct(
  //   @Body() newProduct: ProductDTO,
  //   @Res() res: Response,
  // ): Promise<ProductDTO | ExceptionHandling> {
  //   try {
  //     // const newProductResult = await this.productsService.createProduct(newProduct);
  //     // switch (newProductResult) {
  //     //   case null || undefined:
  //     //     msg =
  //     //       'The product could not be added to the database why is null or not defined.';
  //     //     exception = new ExceptionHandling().badRequest(res, msg);
  //     //     return exception;
  //     //   // case newProduct.hasOwnProperty('error'):
  //     //   //   msg =
  //     //   //     'The product could not be added to the database why is null or not defined.';
  //     //   //   exception = new ExceptionHandling().badRequest(res, msg);
  //     //   //   return exception;
  //     //   default:
  //     //     if(newProductResult.hasOwnProperty('error')){
  //     //     return newProductResult[0].message;
  //     //     }
  //     //     return newProductResult;
  //     // }
  //     // if (newProduct == null || newProduct == undefined) {
  //     //   msg =
  //     //     'The product could not be added to the database why is null or not defined.';
  //     //   exception = new ExceptionHandling().badRequest(res, msg);
  //     //   return exception;
  //     // }
  //   } catch (error) {
  //     console.log(`Error in createProduct controller. Caused by ${error}`);
  //     msg = `The product could not be added to the database. Caused by ${error}`;
  //     exception = new ExceptionHandling().conflict(res, msg);
  //     return exception;
  //   }
  // }

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
  @Get('/list-with-filter-type')
  @ApiOperation({
    summary:
      'Get all paginated products products according to the type and value of a product',
  })
  async getAllFilterTypeProducts(
    @Query('filterBy') filterBy: string,
    @Query('filterValue') filterValue: string,
    @Query('pageNro') pageNro: number,
    @Query('pageSize') pageSize: number,
    @Query('orderBy') orderBy: string,
    @Query('orderAt') orderAt: string,
  ): Promise<Product[]> {
    try {
      return await this.productsService.getAllFilterTypeProducts(
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
   * @description Controller to get a paginated list products according to the description passed as a parameter
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
   * @description Controller to get a paginated list products according to the sku passed as a parameter
   * @param {string} inputSku string type
   * @param {number} pageNro number type
   * @param {number} pageSize number type
   * @param {string} orderBy string type
   * @param {string} orderAt string type
   * @returns a response with the products paginated list and status code
   */
  @Get('/sku/:inputSku')
  @ApiOperation({
    summary: 'Get a product according to the sku passed as a parameter',
  })
  async getBySkuProducts(
    @Param('inputSku') inputSku: string,
    @Query('pageNro') pageNro: number,
    @Query('pageSize') pageSize: number,
    @Query('orderBy') orderBy: string,
    @Query('orderAt') orderAt: string,
  ): Promise<Product[]> {
    try {
      return await this.productsService.getBySkuProducts(
        inputSku,
        pageNro,
        pageSize,
        orderBy,
        orderAt,
      );
    } catch (error) {
      console.log(`Error in getBySkuProducts controller. Caused by ${error}`);
    }
  }

  /**
   * @description Controller to get a paginated list products according to the volume passed as a parameter
   * @param {number} inputVolume number type
   * @param {number} pageNro number type
   * @param {number} pageSize number type
   * @param {string} orderBy string type
   * @param {string} orderAt string type
   * @returns a response with the products paginated list and status code
   */
  @Get('/volume/:inputVolume')
  @ApiOperation({
    summary: 'Get a product according to the volume passed as a parameter',
  })
  async getByVolumeProducts(
    @Param('inputVolume') inputVolume: number,
    @Query('pageNro') pageNro: number,
    @Query('pageSize') pageSize: number,
    @Query('orderBy') orderBy: string,
    @Query('orderAt') orderAt: string,
  ): Promise<Product[]> {
    try {
      return await this.productsService.getByVolumeProducts(
        inputVolume,
        pageNro,
        pageSize,
        orderBy,
        orderAt,
      );
    } catch (error) {
      console.log(
        `Error in getByVolumeProducts controller. Caused by ${error}`,
      );
    }
  }

  /**
   * @description Controller to get a paginated list products according to the product type enum passed as a parameter
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

  /**
   * @description Controller to get a paginated list products according to the creation or update date passed as a parameter
   * @param {Date} inputCreationUpdateDate Date type
   * @param {number} pageNro number type
   * @param {number} pageSize number type
   * @param {string} orderBy string type
   * @param {string} orderAt string type
   * @returns a response with the products paginated list and status code
   */
  @Get('/creation-update-date/:inputCreationUpdateDate')
  @ApiOperation({
    summary:
      'Get a product according to the creation or update date passed as a parameter',
  })
  async getByCreationUpdateDateProducts(
    @Param('inputCreationUpdateDate') inputCreationUpdateDate: Date,
    @Query('pageNro') pageNro: number,
    @Query('pageSize') pageSize: number,
    @Query('orderBy') orderBy: string,
    @Query('orderAt') orderAt: string,
  ): Promise<Product[]> {
    try {
      return await this.productsService.getByCreationUpdateDateProducts(
        inputCreationUpdateDate,
        pageNro,
        pageSize,
        orderBy,
        orderAt,
      );
    } catch (error) {
      console.log(
        `Error in getByCreationUpdateDateProducts controller. Caused by ${error}`,
      );
    }
  }
}
