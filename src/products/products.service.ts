/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
//Models
import { Product } from './models/product.entity';

/**
 * @description Product srvice for all crud operations
 * @param {Object} event Object type
 */
@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_REPOSITORY') private productRepository: Repository<Product>,
  ) {}

  /**
   * @description Service to get a paginated listing of all products
   * @queryParam limit: number
   * @queryParam order_by: string
   * @queryParam order_at: string
   * @returns an object with the list of products
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
}
