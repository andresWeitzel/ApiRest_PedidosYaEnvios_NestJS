/* eslint-disable prettier/prettier */

import { Test } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(async() => {

    const moduleRef = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

  productsService = moduleRef.get<ProductsService>(ProductsService);
  productsController = moduleRef.get<ProductsController>(ProductsController);
  });

  describe('getAllProducts', () => {
    it('should return an array of cats', async () => {
      const result = Promise['test'];
      jest.spyOn(productsService, 'getAllProducts').mockImplementation(() => result);

      expect(await productsController.getAllProducts(0,10,'id','asc')).toBe(result);
    });
  });
});