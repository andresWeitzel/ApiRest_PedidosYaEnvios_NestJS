/* eslint-disable prettier/prettier */
//external
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
//Enums
import { ProductType } from '../enums/productType';

// eslint-disable-next-line prettier/prettier
@ApiTags('ProductDTO')
export class ProductDTO {
  @IsNotEmpty()
  @ApiProperty({
    name: 'value',
    description: 'price value of a product',
    type: 'decimal',
    example: '4.378',
  })
  value: number;

  @IsNotEmpty()
  @ApiProperty({
    name: 'description',
    description: 'description of a product',
    type: 'string',
    minLength: 4,
    maxLength: 700,
    example: '30 Piezas y Vino Fabric Malbec....',
  })
  description: string;

  @IsNotEmpty()
  @ApiProperty({
    name: 'sku',
    description: 'sku of a product',
    type: 'string',
    minLength: 1,
    maxLength: 10,
    example: 'JJUS78A',
  })
  sku: string;

  @IsNotEmpty()
  @ApiProperty({
    name: 'volume',
    description: 'volume of a product',
    type: 'decimal',
    example: '0.500',
  })
  volume: number;

  @IsNotEmpty()
  @ApiProperty({
    name: 'weight',
    description: 'weight of a product',
    type: 'decimal',
    example: '0.500',
  })
  weight: number;

  @IsNotEmpty()
  @ApiProperty({
    name: 'quantity',
    description: 'quantity of a product',
    type: 'bigint',
    example: '2',
  })
  quantity: number;

  @IsNotEmpty()
  @ApiProperty({
    name: 'productType',
    description: 'type of a product',
    type: 'ProductType',
    minLength: 1,
    maxLength: 10,
    example: 'STANDARD (only enum: STANDARD, FRAGILE or COLD)',
  })
  productType: ProductType;
}
