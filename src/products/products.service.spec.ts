/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import { Test } from '@nestjs/testing';
// import { ProductsService } from './products.service';
// import { INestApplication } from '@nestjs/common';
// import { ProductsModule } from './products.module';


// // describe('ProductsServiceCompile', () => {
// //   let productsService: ProductsService;

// //   beforeEach(async () => {
// //     const productsServiceModule: TestingModule = await Test.createTestingModule({
// //       imports: [TypeOrmModule.forFeature([Product])],
// //       providers: [ProductsService],
// //     }).compile();

// //     productsService = productsServiceModule.get<ProductsService>(ProductsService);
// //   });

// //   describe('ProductsServiceDefined', () => {
// //     it('should be defined', () => {
// //       expect(productsService).toBeDefined();
// //     });
// //   });
// // });


// describe('ProductsServiceCompile', () => {
//   let app: INestApplication;
//   const productsService = { findAll: () => ['test'] };

//   beforeAll(async () => {
//     const moduleRef = await Test.createTestingModule({
//       imports: [ProductsModule],
//     })
//       .overrideProvider(ProductsService)
//       .useValue(productsService)
//       .compile();

//     app = moduleRef.createNestApplication();
//     await app.init();
//   });

//   // it(`/GET cats`, () => {
//   //   return request(app.getHttpServer())
//   //     .get('/cats')
//   //     .expect(200)
//   //     .expect({
//   //       data: productsService.findAll(),
//   //     });
//   // });

//   afterAll(async () => {
//     await app.close();
//   });
// });