/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
//Models
import { Product } from './models/product.entity';
import { ProductType } from './enums/productType';
import { ProductDTO } from './models/product.dto';
//Helpers
import { validateProductObject } from './helpers/models/validateProductObject';
//Const-vars
const ID_NAME_VALUE = 'id';
const VALUE_NAME_VALUE = 'value';
// const DESCRIPTION_NAME_VALUE = 'description';
// const SKU_NAME_VALUE = 'sku';
// const VOLUME_NAME_VALUE = 'volume';
// const WEIGHT_NAME_VALUE = 'weight';
// const QUANTITY_NAME_VALUE = 'quantity';
// const PRODUCT_TYPE_NAME_VALUE = 'product_type';
// const CREATION_DATE_NAME_VALUE = 'creation_date';
// const UPDATE_DATE_NAME_VALUE = 'update_date';

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
      //-- start with validation object  ---
      const validateObject = await validateProductObject(product);
      if (validateObject.length) {
        return validateObject;
      }
      //-- end with validation object  ---
      const newProduct = this.productRepository.create(product);

      const newProductSaved = await this.productRepository.save(newProduct);

      return newProductSaved;
    } catch (error) {
      console.log(`Error in createProduct service. Caused by ${error}`);
    }
  }

  /**
   * @description Service to update and save a product according to id
   * @param {number} inputId number type
   * @param {ProductDTO} product ProductDTO type
   * @returns an object with the product
   */
  async updateProduct(inputId: number, product: ProductDTO): Promise<Product> {
    try {
      //-- start with validation object  ---
      const validateObject = await validateProductObject(product);
      if (validateObject.length) {
        return validateObject;
      }
      //-- end with validation object  ---

      const updateProduct = await this.productRepository.update(
        inputId,
        product,
      );

      console.log(updateProduct);

      if (updateProduct != null || updateProduct != undefined) {
        return this.getByIdProduct(inputId);
      }
    } catch (error) {
      console.log(`Error in updateProduct service. Caused by ${error}`);
    }
  }

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
      pageNro = (pageNro == null || pageNro == undefined ? 0 : pageNro) || 0;
      pageSize =
        (pageSize == null || pageSize == undefined ? 20 : pageSize) || 20;
      orderBy =
        (orderBy == null || orderBy == undefined || orderBy == ''
          ? ID_NAME_VALUE
          : orderBy) || ID_NAME_VALUE;
      orderAt =
        (orderAt == null || orderAt == undefined || orderAt == ''
          ? 'ASC'
          : orderAt) || 'ASC';
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

  /**
   * @description Service to get a product according to the type of filter and value
   * @param {string} filterBy string type
   * @param {string} filterValue string type
   * @param {number} pageNro number type
   * @param {number} pageSize number type
   * @param {string} orderBy string type
   * @param {string} orderAt string type
   * @returns an object with the products paginated list
   */
  async getAllFilterTypeProducts(
    filterBy: string,
    filterValue: string,
    pageNro: number,
    pageSize: number,
    orderBy: string,
    orderAt: string,
  ): Promise<Product[]> {
    try {
      filterBy = filterBy.toLowerCase();

      switch (filterBy) {
        case null || undefined: {
          filterBy = ID_NAME_VALUE;
          break;
        }
        case ID_NAME_VALUE || filterBy.includes(ID_NAME_VALUE): {
          filterBy = ID_NAME_VALUE;
          break;
        }
        case VALUE_NAME_VALUE || filterBy.includes(VALUE_NAME_VALUE): {
          filterBy = VALUE_NAME_VALUE;
          break;
        }
        case VALUE_NAME_VALUE || filterBy.includes(VALUE_NAME_VALUE): {
          filterBy = VALUE_NAME_VALUE;
          break;
        }
        default: {
          filterBy = ID_NAME_VALUE;
        }
      }

      filterValue =
        (filterValue == null || filterValue == undefined ? '1' : filterValue) ||
        '1';
      pageNro = (pageNro == null || pageNro == undefined ? 0 : pageNro) || 0;
      pageSize =
        (pageSize == null || pageSize == undefined ? 20 : pageSize) || 20;
      orderBy =
        (orderBy == null || orderBy == undefined || orderBy == ''
          ? ID_NAME_VALUE
          : orderBy) || ID_NAME_VALUE;
      orderAt =
        (orderAt == null || orderAt == undefined || orderAt == ''
          ? 'ASC'
          : orderAt) || 'ASC';

      return await this.productRepository.find({
        where: {
          [filterBy]: Like(`%${filterValue}%`),
        },
        order: {
          [orderBy]: orderAt,
        },
        skip: pageNro,
        take: pageSize,
      });
    } catch (error) {
      console.log(
        `Error in getAllFilterTypeProducts service. Caused by ${error}`,
      );
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

  /**
   * @description Service to get a paginated list products according to the description
   * @param {string} inputDescription string type
   * @param {number} pageNro number type
   * @param {number} pageSize number type
   * @param {string} orderBy string type
   * @param {string} orderAt string type
   * @returns an object with the products paginated list
   */
  async getByDescriptionProducts(
    inputDescription: string,
    pageNro: number,
    pageSize: number,
    orderBy: string,
    orderAt: string,
  ): Promise<Product[]> {
    try {
      pageNro = (pageNro == null || pageNro == undefined ? 0 : pageNro) || 0;
      pageSize =
        (pageSize == null || pageSize == undefined ? 20 : pageSize) || 20;
      orderBy =
        (orderBy == null || orderBy == undefined || orderBy == ''
          ? ID_NAME_VALUE
          : orderBy) || ID_NAME_VALUE;
      orderAt =
        (orderAt == null || orderAt == undefined || orderAt == ''
          ? 'ASC'
          : orderAt) || 'ASC';
      inputDescription =
        inputDescription == null ||
        inputDescription == undefined ||
        inputDescription == ''
          ? ' '
          : inputDescription;

      return await this.productRepository.find({
        where: {
          description: Like(`%${inputDescription}%`),
        },
        order: {
          [orderBy]: orderAt,
        },
        skip: pageNro,
        take: pageSize,
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description Service to get a paginated list products according to the sku
   * @param {string} inputSku string type
   * @param {number} pageNro number type
   * @param {number} pageSize number type
   * @param {string} orderBy string type
   * @param {string} orderAt string type
   * @returns an object with the products paginated list
   */
  async getBySkuProducts(
    inputSku: string,
    pageNro: number,
    pageSize: number,
    orderBy: string,
    orderAt: string,
  ): Promise<Product[]> {
    try {
      pageNro = (pageNro == null || pageNro == undefined ? 0 : pageNro) || 0;
      pageSize =
        (pageSize == null || pageSize == undefined ? 20 : pageSize) || 20;
      orderBy =
        (orderBy == null || orderBy == undefined || orderBy == ''
          ? ID_NAME_VALUE
          : orderBy) || ID_NAME_VALUE;
      orderAt =
        (orderAt == null || orderAt == undefined || orderAt == ''
          ? 'ASC'
          : orderAt) || 'ASC';
      inputSku =
        inputSku == null || inputSku == undefined || inputSku == ''
          ? ' '
          : inputSku;

      return await this.productRepository.find({
        where: {
          sku: Like(`%${inputSku}%`),
        },
        order: {
          [orderBy]: orderAt,
        },
        skip: pageNro,
        take: pageSize,
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description Service to get a paginated list products according to the volume
   * @param {number} inputVolume number type
   * @param {number} pageNro number type
   * @param {number} pageSize number type
   * @param {string} orderBy string type
   * @param {string} orderAt string type
   * @returns an object with the products paginated list
   */
  async getByVolumeProducts(
    inputVolume: number,
    pageNro: number,
    pageSize: number,
    orderBy: string,
    orderAt: string,
  ): Promise<Product[]> {
    try {
      pageNro = (pageNro == null || pageNro == undefined ? 0 : pageNro) || 0;
      pageSize =
        (pageSize == null || pageSize == undefined ? 20 : pageSize) || 20;
      orderBy =
        (orderBy == null || orderBy == undefined || orderBy == ''
          ? ID_NAME_VALUE
          : orderBy) || ID_NAME_VALUE;
      orderAt =
        (orderAt == null || orderAt == undefined || orderAt == ''
          ? 'ASC'
          : orderAt) || 'ASC';
      inputVolume =
        inputVolume == null || inputVolume == undefined ? 1.0 : inputVolume;

      return await this.productRepository.find({
        where: {
          volume: inputVolume,
        },
        order: {
          [orderBy]: orderAt,
        },
        skip: pageNro,
        take: pageSize,
      });
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * @description Service to get a paginated list products according to the product type
   * @param {ProductType} inputProductType enum type
   * @param {number} pageNro number type
   * @param {number} pageSize number type
   * @param {string} orderBy string type
   * @param {string} orderAt string type
   * @returns an object with the products paginated list
   */
  async getByProductTypeProducts(
    inputProductType: ProductType,
    pageNro: number,
    pageSize: number,
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
      pageNro = (pageNro == null || pageNro == undefined ? 0 : pageNro) || 0;
      pageSize =
        (pageSize == null || pageSize == undefined ? 20 : pageSize) || 20;

      return await this.productRepository.find({
        where: {
          productType: inputProductType,
        },
        order: {
          [orderBy]: orderAt,
        },
        skip: pageNro,
        take: pageSize,
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description Service to get a paginated list products according to the creation or update date
   * @param {string} inputCreationUpdateDate string type
   * @param {number} pageNro number type
   * @param {number} pageSize number type
   * @param {string} orderBy string type
   * @param {string} orderAt string type
   * @returns an object with the products paginated list
   */
  async getByCreationUpdateDateProducts(
    inputCreationUpdateDate: Date,
    pageNro: number,
    pageSize: number,
    orderBy: string,
    orderAt: string,
  ): Promise<Product[]> {
    try {
      pageNro = (pageNro == null || pageNro == undefined ? 0 : pageNro) || 0;
      pageSize =
        (pageSize == null || pageSize == undefined ? 20 : pageSize) || 20;

      return await this.productRepository.find({
        where: [
          { creationDate: inputCreationUpdateDate },
          { updateDate: inputCreationUpdateDate },
        ],
        order: {
          [orderBy]: orderAt,
        },
        skip: pageNro,
        take: pageSize,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
