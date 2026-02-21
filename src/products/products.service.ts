/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
//Models
import { Product } from './models/product.entity';
import { ProductType } from './enums/productType';
//import { ProductDTO } from './models/product.dto';
//Helpers
import { validateProductObject } from './helpers/models/validateProductObject';

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

  // /**
  //  * @description Service to create and save a product
  //  * @param {ProductDTO} product ProductDTO type
  //  * @returns an object with the product
  //  */
  // async createProduct(product: ProductDTO): Promise<Product> {
  //   try {
  //     //-- start with validation object  ---
  //     const validateObject = await validateProductObject(product);
  //     if (validateObject.length) {
  //       return validateObject;
  //     }
  //     //-- end with validation object  ---
  //     const newProduct = this.productRepository.create(product);

  //     return await this.productRepository.save(newProduct);
  //   } catch (error) {
  //     console.log(`Error in createProduct service. Caused by ${error}`);
  //   }
  // }

  // /**
  //  * @description Service to update and save a product according to id
  //  * @param {number} inputId number type
  //  * @param {ProductDTO} product ProductDTO type
  //  * @returns an object with the product
  //  */
  // async updateProduct(inputId: number, product: ProductDTO): Promise<Product> {
  //   try {
  //     //-- start with validation object  ---
  //     const validateObject = await validateProductObject(product);
  //     if (validateObject.length) {
  //       return validateObject;
  //     }
  //     //-- end with validation object  ---

  //     const updateProduct = await this.productRepository.update(
  //       inputId,
  //       product,
  //     );

  //     console.log(updateProduct);

  //     if (updateProduct != (null || undefined)) {
  //       return this.getByIdProduct(inputId);
  //     }
  //   } catch (error) {
  //     console.log(`Error in updateProduct service. Caused by ${error}`);
  //   }
  // }

  /**
   * @description Service to get a paginated listing of all products
   * @param {number} pageNro number type
   * @param {number} pageSize number type
   * @param {string} orderBy string type
   * @param {string} orderAt string type
   * @returns an object with the products paginated list
   */
  async getAllProducts(
    pageNro: number,
    pageSize: number,
    orderBy: string,
    orderAt: string,
  ): Promise<Product[]> {
    try {
      console.log(pageNro);
      pageNro = (pageNro == (null || undefined || NaN) ? 0 : pageNro) || 0;
      pageSize = (pageSize == (null || undefined || NaN) ? 20 : pageSize) || 20;
      orderBy = (orderBy == (null || undefined || '') ? 'id' : orderBy) || 'id';
      orderAt =
        (orderAt == (null || undefined || '') ? 'ASC' : orderAt) || 'ASC';
      return await this.productRepository.find({
        order: {
          [orderBy]: orderAt,
        },
        skip: pageNro,
        take: pageSize,
      });
    } catch (error) {
      console.log(`Error in getAllProducts service. Caused by ${error}`);
    }
  }

  // /**
  //  * @description Service to get a product according to the type of filter and value
  //  * @param {string} filterBy string type
  //  * @param {string} filterValue string type
  //  * @param {number} pageNro number type
  //  * @param {number} pageSize number type
  //  * @param {string} orderBy string type
  //  * @param {string} orderAt string type
  //  * @returns an object with the products paginated list
  //  */
  // async getAllWithFilterProducts(
  //   filterBy: string,
  //   filterValue: string,
  //   pageNro: number,
  //   pageSize: number,
  //   orderBy: string,
  //   orderAt: string,
  // ): Promise<Product[]> {
  //   try {
  //     filterBy = (filterBy == (null || undefined) ? 'id' : filterBy) || 'id';
  //     filterValue =
  //       (filterValue == (null || undefined) ? '1' : filterValue) || '1';
  //     pageNro = (pageNro == (null || undefined || NaN) ? 0 : pageNro) || 0;
  //     pageSize = (pageSize == (null || undefined || NaN) ? 20 : pageSize) || 20;
  //     orderBy = (orderBy == (null || undefined || '') ? 'id' : orderBy) || 'id';
  //     orderAt =
  //       (orderAt == (null || undefined || '') ? 'ASC' : orderAt) || 'ASC';
  //     return await this.productRepository.find({
  //       where: {
  //         [filterBy]: Like(`%${filterValue}%`),
  //       },
  //       order: {
  //         [orderBy]: orderAt,
  //       },
  //       skip: pageNro,
  //       take: pageSize,
  //     });
  //   } catch (error) {
  //     console.log(
  //       `Error in getAllWithFilterProducts service. Caused by ${error}`,
  //     );
  //   }
  // }

  // /**
  //  * @description Service to get a product according to id
  //  * @param {number} inputId number type
  //  * @returns an object with the product
  //  */
  // async getByIdProduct(inputId: number): Promise<Product> {
  //   try {
  //     inputId = inputId == (null || undefined || 0) ? 1 : inputId;

  //     return await this.productRepository.findOne({
  //       where: {
  //         id: inputId,
  //       },
  //     });
  //   } catch (error) {
  //     console.log(`Error in getByIdProduct service. Caused by ${error}`);
  //   }
  // }

  // /**
  //  * @description Service to get a product according to the description
  //  * @param {string} inputDescription string type
  //  * @param {number} pageNro number type
  //  * @param {number} pageSize number type
  //  * @param {string} orderBy string type
  //  * @param {string} orderAt string type
  //  * @returns an object with the products paginated list
  //  */
  // async getByDescriptionProducts(
  //   inputDescription: string,
  //   pageNro: number,
  //   pageSize: number,
  //   orderBy: string,
  //   orderAt: string,
  // ): Promise<Product[]> {
  //   try {
  //     pageNro = (pageNro == (null || undefined || NaN) ? 0 : pageNro) || 0;
  //     pageSize = (pageSize == (null || undefined || NaN) ? 20 : pageSize) || 20;
  //     orderBy = (orderBy == (null || undefined || '') ? 'id' : orderBy) || 'id';
  //     orderAt =
  //       (orderAt == (null || undefined || '') ? 'ASC' : orderAt) || 'ASC';
  //     inputDescription =
  //       inputDescription == (null || undefined || '') ? ' ' : inputDescription;

  //     return await this.productRepository.find({
  //       where: {
  //         description: Like(`%${inputDescription}%`),
  //       },
  //       order: {
  //         [orderBy]: orderAt,
  //       },
  //       skip: pageNro,
  //       take: pageSize,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

//   /**
//    * @description Service to get a product according to the product type
//    * @param {ProductType} inputProductType enum type
//    * @param {number} pageNro number type
//    * @param {number} pageSize number type
//    * @param {string} orderBy string type
//    * @param {string} orderAt string type
//    * @returns an object with the products paginated list
//    */
//   async getByProductTypeProducts(
//     inputProductType: ProductType,
//     pageNro: number,
//     pageSize: number,
//     orderBy: string,
//     orderAt: string,
//   ): Promise<Product[]> {
//     try {
//       if (inputProductType.match(/(^|\W)cold($|\W)/)) {
//         inputProductType = ProductType.COLD;
//       } else if (inputProductType.match(/(^|\W)fragile($|\W)/)) {
//         inputProductType = ProductType.FRAGILE;
//       } else if (inputProductType.match(/(^|\W)standard($|\W)/)) {
//         inputProductType = ProductType.FRAGILE;
//       } else {
//         inputProductType =
//           inputProductType !=
//           (ProductType.COLD || ProductType.FRAGILE || ProductType.STANDARD)
//             ? ProductType.STANDARD
//             : inputProductType;
//       }
//       pageNro = (pageNro == (null || undefined || NaN) ? 0 : pageNro) || 0;
//       pageSize = (pageSize == (null || undefined || NaN) ? 20 : pageSize) || 20;
     

//       return await this.productRepository.find({
//         where: {
//           productType: inputProductType,
//         },
//         order: {
//           [orderBy]: orderAt,
//         },
//         skip: pageNro,
//         take: pageSize,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

}
