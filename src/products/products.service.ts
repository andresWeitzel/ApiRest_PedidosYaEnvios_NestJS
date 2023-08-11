/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
//Models
import { Product } from './models/product.entity';
import { ProductType } from './enums/productType';
import { ProductDTO } from './models/product.dto';

/**
 * @description Product srvice for all crud operations
 * @param {Object} event Object type
 */
@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_REPOSITORY')
    private productRepository: Repository<Product>,
  ) {}

  /**
   * @description Service to create and save a product
   * @param {ProductDTO} product ProductDTO type
   * @returns an object with the product
   */
  async createProduct(product: ProductDTO): Promise<Product> {
    try {
      const newProduct = this.productRepository.create(product);

      return await this.productRepository.save(newProduct);
    } catch (error) {
      console.log(`Error in createProduct service. Caused by ${error}`);
    }
  }

  /**
   * @description Service to get a paginated listing of all products
   * @param {number} limit number type
   * @param {string} orderBy string type
   * @param {string} orderAt string type
   * @returns an object with the products paginated list
   */
  async getAllProducts(
    limit: number,
    orderBy: string,
    orderAt: string,
  ): Promise<Product[]> {
    try {
      limit = limit == (null || undefined) ? 20 : limit;
      orderBy = orderBy == (null || undefined || '') ? 'id' : orderBy;
      orderAt = orderAt == (null || undefined || '') ? 'ASC' : orderAt;
      return await this.productRepository.find({
        order: {
          [orderBy]: orderAt,
        },
        take: limit,
      });
    } catch (error) {
      console.log(`Error in getAllProducts service. Caused by ${error}`);
    }
  }

  /**
   * @description Service to get a product according to id
   * @param {number} inputId number type
   * @returns an object with the product
   */
  async getByIdProduct(inputId: number): Promise<Product> {
    try {
      inputId = inputId == (null || undefined || 0) ? 1 : inputId;

      return await this.productRepository.findOne({
        where: {
          id: inputId,
        },
      });
    } catch (error) {
      console.log(`Error in getByIdProduct service. Caused by ${error}`);
    }
  }

  // async getByValueProducts(
  //   inputValue: number,
  //   limit: number,
  //   orderBy: string,
  //   orderAt: string,
  // ): Promise<Product[]> {
  //   try {
  //     return await this.productRepository.find({
  //       where: {
  //         value: Like(`%${inputValue}%`),
  //       },
  //       order: {
  //         [orderBy]: orderAt,
  //       },
  //       take: limit,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  /**
   * @description Service to get a product according to the description
   * @param {string} inputDescription string type
   * @param {number} limit number type
   * @param {string} orderBy string type
   * @param {string} orderAt string type
   * @returns an object with the products paginated list
   */
  async getByDescriptionProducts(
    inputDescription: string,
    limit: number,
    orderBy: string,
    orderAt: string,
  ): Promise<Product[]> {
    try {
      inputDescription =
        inputDescription == (null || undefined || '') ? ' ' : inputDescription;

      return await this.productRepository.find({
        where: {
          description: Like(`%${inputDescription}%`),
        },
        order: {
          [orderBy]: orderAt,
        },
        take: limit,
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description Service to get a product according to the product type
   * @param {ProductType} inputProductType enum type
   * @param {number} limit number type
   * @param {string} orderBy string type
   * @param {string} orderAt string type
   * @returns an object with the products paginated list
   */
  async getByProductTypeProducts(
    inputProductType: ProductType,
    limit: number,
    orderBy: string,
    orderAt: string,
  ): Promise<Product[]> {
    try {
      if (inputProductType.match(/(^|\W)cold($|\W)/)) {
        inputProductType = ProductType.COLD;
      } else if (inputProductType.match(/(^|\W)fragile($|\W)/)) {
        inputProductType = ProductType.FRAGILE;
      } else if (inputProductType.match(/(^|\W)standard($|\W)/)) {
        inputProductType = ProductType.FRAGILE;
      } else {
        inputProductType =
          inputProductType !=
          (ProductType.COLD || ProductType.FRAGILE || ProductType.STANDARD)
            ? ProductType.STANDARD
            : inputProductType;
      }

      return await this.productRepository.find({
        where: {
          productType: inputProductType,
        },
        order: {
          [orderBy]: orderAt,
        },
        take: limit,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
