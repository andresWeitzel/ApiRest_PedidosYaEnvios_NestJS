/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsProviders } from './products.providers';
import { DatabaseModule } from '../database/database.module';


describe('ProductsControllerTest', () => {
  let productsController: ProductsController;
  let FIRST_PAGE_VALUE:number = 0;
  let SECOND_PAGE_VALUE:number = 1;
  let THIRD_PAGE_VALUE:number = 2;
  let FIRST_QUANTITY_VALUE:number=10;
  let SECOND_QUANTITY_VALUE:number=20;
  let ID_NAME_VALUE:string='id';
  let DESCRIPTION_NAME_VALUE:string='description';
  let ORDER_ASC_NAME_VALUE:string='asc';
  let ORDER_DESC_NAME_VALUE:string='desc';

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [...ProductsProviders, ProductsService],
      controllers: [ProductsController],
    }).compile();

    productsController = moduleRef.get<ProductsController>(ProductsController);
  });

  describe('getAllProducts', () => {
    it(`Should return a paginated list of all products for page ${FIRST_PAGE_VALUE}, quantity ${FIRST_QUANTITY_VALUE}, order at ${ID_NAME_VALUE} and order by ${ORDER_ASC_NAME_VALUE} `, async () => {
      expect(await productsController.getAllProducts(FIRST_PAGE_VALUE, FIRST_QUANTITY_VALUE, ID_NAME_VALUE, ORDER_ASC_NAME_VALUE));
    });
  });
  describe('getAllProducts', () => {
    it(`should return a paginated listing of all products for page ${SECOND_PAGE_VALUE}, quantity ${SECOND_QUANTITY_VALUE}, order at ${DESCRIPTION_NAME_VALUE} and order by ${ORDER_DESC_NAME_VALUE}`, async () => {
      expect(await productsController.getAllProducts(SECOND_PAGE_VALUE, SECOND_QUANTITY_VALUE, DESCRIPTION_NAME_VALUE, ORDER_DESC_NAME_VALUE));
    });
  });

  describe('getAllFilterTypeProducts', () => {
    it('should return a paginated listing of all products according to the type and value of a product', async () => {
      expect(await productsController.getAllFilterTypeProducts(ID_NAME_VALUE, '1', 0, 10, ID_NAME_VALUE, ORDER_ASC_NAME_VALUE));
    });
  });
});

