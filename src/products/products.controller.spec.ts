/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
//Products imports
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsProviders } from './products.providers';
import { DatabaseModule } from '../database/database.module';
//Const-vars
let FIRST_PAGE_VALUE: number = 0;
let SECOND_PAGE_VALUE: number = 1;
let THIRD_PAGE_VALUE: number = 2;
let FIRST_QUANTITY_VALUE: number = 10;
let SECOND_QUANTITY_VALUE: number = 20;
let THIRD_QUANTITY_VALUE: number = 20;
let ID_NAME_VALUE: string = 'id';
let DESCRIPTION_NAME_VALUE: string = 'description';
let SKU_NAME_VALUE: string='sku';
let VOLUME_NAME_VALUE: string='volume';
let ORDER_ASC_NAME_VALUE: string = 'asc';
let ORDER_DESC_NAME_VALUE: string = 'desc';
let productsController: ProductsController;
let msg:any;
let productsList:any;



describe('ProductsControllerTest', () => {
  productsController=null;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [...ProductsProviders, ProductsService],
      controllers: [ProductsController],
    }).compile();

    productsController = moduleRef.get<ProductsController>(ProductsController);
  });

  //Start for getAllProducts
  describe('getAllProducts', () => {
    msg=`getAllProducts first case : Should return a paginated list of all products for page ${FIRST_PAGE_VALUE}, quantity ${FIRST_QUANTITY_VALUE}, order at ${ID_NAME_VALUE} and order by ${ORDER_ASC_NAME_VALUE} `;
    productsList=null;
    
    it(msg, async () => {
      productsList =  await productsController.getAllProducts(
        FIRST_PAGE_VALUE,
        FIRST_QUANTITY_VALUE,
        ID_NAME_VALUE,
        ORDER_ASC_NAME_VALUE,
      );
      console.log(`${msg}`);
      console.log(productsList);
      expect(
        productsList
      );
    });
  });
  describe('getAllProducts', () => {
    it(`should return a paginated listing of all products for page ${SECOND_PAGE_VALUE}, quantity ${SECOND_QUANTITY_VALUE}, order at ${DESCRIPTION_NAME_VALUE} and order by ${ORDER_DESC_NAME_VALUE}`, async () => {
      expect(
        await productsController.getAllProducts(
          SECOND_PAGE_VALUE,
          SECOND_QUANTITY_VALUE,
          DESCRIPTION_NAME_VALUE,
          ORDER_DESC_NAME_VALUE,
        ),
      );
    });
  });
  describe('getAllProducts', () => {
    it(`should return a paginated listing of all products for page ${THIRD_PAGE_VALUE}, quantity ${THIRD_QUANTITY_VALUE}, order at ${SKU_NAME_VALUE} and order by ${ORDER_ASC_NAME_VALUE}`, async () => {
      expect(
        await productsController.getAllProducts(
          THIRD_PAGE_VALUE,
          THIRD_QUANTITY_VALUE,
          SKU_NAME_VALUE,
          ORDER_ASC_NAME_VALUE,
        ),
      );
    });
  });
  //End for getAllFilterTypeProducts
  describe('getAllFilterTypeProducts', () => {
    it(`should return a paginated listing of all products for page ${FIRST_PAGE_VALUE}, quantity ${FIRST_QUANTITY_VALUE}, order at ${VOLUME_NAME_VALUE} and order by ${ORDER_DESC_NAME_VALUE} according to the type of field ${ID_NAME_VALUE} and value '1' of the field of products`, async () => {
      productsList = await productsController.
      getAllFilterTypeProducts(
        ID_NAME_VALUE,
        '1',
        FIRST_PAGE_VALUE,
        FIRST_QUANTITY_VALUE,
        VOLUME_NAME_VALUE,
        ORDER_DESC_NAME_VALUE,
      );
      console.log({'|| getAllFilterTypeProducts || : ':productsList});
      expect(
        productsList
      );
    });
  });
});
