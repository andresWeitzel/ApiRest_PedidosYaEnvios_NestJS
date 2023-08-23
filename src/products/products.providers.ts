/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import { Product } from './models/product.entity';

export const ProductsProviders = [
  {
    provide: 'PRODUCTS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Product),
    inject: ['DATA_SOURCE'],
  },
];
