/* eslint-disable prettier/prettier */
//external
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
  Length,
  Max,
  Min,
} from 'class-validator';
//Enums
import { ProductType } from '../enums/productType';
//Const-vars
const NAME_VALUE_FOR_VALUE = 'value';
const NAME_VALUE_FOR_DESCRIPTION = 'description';
const NAME_VALUE_FOR_SKU = 'sku';
const NAME_VALUE_FOR_VOLUME = 'volume';
const NAME_VALUE_FOR_WEIGHT = 'weight';
const NAME_VALUE_FOR_QUANTITY = 'quantity';
const NAME_VALUE_FOR_PRODUCT_TYPE = 'productType';
const DECIMAL_SCALE_VALUE = 3;
const MIN_VALUE_FOR_VALUE = 1.0;
const MAX_VALUE_FOR_VALUE = 999999999.999;
const MIN_LENGTH_VALUE_FOR_DESCRIPTION = 4;
const MAX_LENGTH_VALUE_FOR_DESCRIPTION = 700;
const MIN_LENGTH_VALUE_FOR_SKU = 1;
const MAX_LENGTH_VALUE_FOR_SKU = 50;
const MIN_LENGTH_VALUE_FOR_VOLUME_WEIGHT = 0.001;
const MAX_LENGTH_VALUE_FOR_VOLUME_WEIGHT = 9999.999;
const MIN_VALUE_FOR_QUANTITY = 1;
const MAX_VALUE_FOR_QUANTITY = 999999999;

// eslint-disable-next-line prettier/prettier
@ApiTags('ProductDTO')
export class ProductDTO {
  /**
   * @description Value of the product. The maximum allowed value will depend on the insured coverage, and the calculation is made by summing up all the items submitted."
   */
  @IsNotEmpty({
    message: `The ${NAME_VALUE_FOR_VALUE} of product cannot be empty`,
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
      maxDecimalPlaces: DECIMAL_SCALE_VALUE,
    },
    {
      message: `The ${NAME_VALUE_FOR_VALUE} of product must be of type number (decimal) and contain only three decimal places after the separator`,
    },
  )
  @Min(MIN_VALUE_FOR_VALUE, {
    message: `The value of ${NAME_VALUE_FOR_VALUE} product must be greater than ${MIN_VALUE_FOR_VALUE}`,
  })
  @Max(MAX_VALUE_FOR_VALUE, {
    message: `The value of ${NAME_VALUE_FOR_VALUE} product must be less than ${MAX_VALUE_FOR_VALUE}`,
  })
  @ApiProperty({
    name: `${NAME_VALUE_FOR_VALUE}`,
    description: `price ${NAME_VALUE_FOR_VALUE} of a product`,
    type: 'decimal',
    example: '4.378',
  })
  value: number;

  /**
   * @description description of the product
   */
  @IsNotEmpty({
    message: `The ${NAME_VALUE_FOR_DESCRIPTION} of product cannot be empty`,
  })
  @IsString({
    message: `The ${NAME_VALUE_FOR_DESCRIPTION} must be of type string`,
  })
  @Length(MIN_LENGTH_VALUE_FOR_DESCRIPTION, MAX_LENGTH_VALUE_FOR_DESCRIPTION, {
    message: `The value of the ${NAME_VALUE_FOR_DESCRIPTION} must be between ${MIN_LENGTH_VALUE_FOR_DESCRIPTION} and ${MAX_LENGTH_VALUE_FOR_DESCRIPTION} characters`,
  })
  @ApiProperty({
    name: `${NAME_VALUE_FOR_DESCRIPTION}`,
    description: `${NAME_VALUE_FOR_DESCRIPTION} of a product`,
    type: 'string',
    minLength: MIN_LENGTH_VALUE_FOR_DESCRIPTION,
    maxLength: MAX_LENGTH_VALUE_FOR_DESCRIPTION,
    example: '30 Piezas y Vino Fabric Malbec....',
  })
  description: string;

  /**
   * @description sku identifier of the product
   */
  @IsNotEmpty({ message: 'The sku cannot be empty' })
  @IsString({ message: 'The sku must be of type string' })
  @Length(MIN_LENGTH_VALUE_FOR_SKU, MAX_LENGTH_VALUE_FOR_SKU, {
    message: `The value of the sku must be between ${MIN_LENGTH_VALUE_FOR_SKU} and ${MAX_LENGTH_VALUE_FOR_SKU} characters`,
  })
  @ApiProperty({
    name: 'sku',
    description: 'sku of a product',
    type: 'string',
    minLength: 1,
    maxLength: 10,
    example: 'JJUS78A',
  })
  sku: string;

  /**
   * @description volume of the product in liters
   */
  @IsNotEmpty({ message: 'The volume of product cannot be empty' })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
      maxDecimalPlaces: DECIMAL_SCALE_VALUE,
    },
    {
      message:
        'The volume of a product must be of type number (decimal) and contain only three decimal places after the separator',
    },
  )
  @Min(MIN_LENGTH_VALUE_FOR_VOLUME_WEIGHT, {
    message: `The volume of a product must be greater than ${MIN_LENGTH_VALUE_FOR_VOLUME_WEIGHT}`,
  })
  @Max(MAX_LENGTH_VALUE_FOR_VOLUME_WEIGHT, {
    message: `The volume of a product must be less than ${MAX_LENGTH_VALUE_FOR_VOLUME_WEIGHT}`,
  })
  @ApiProperty({
    name: 'volume',
    description: 'volume of a product',
    type: 'decimal',
    example: '0.500',
  })
  volume: number;

  /**
   * @description weight of a unit of the product in kilograms
   */
  @IsNotEmpty({ message: 'The weight of product cannot be empty' })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
      maxDecimalPlaces: DECIMAL_SCALE_VALUE,
    },
    {
      message:
        'The weight of a product must be of type number (decimal) and contain only three decimal places after the separator',
    },
  )
  @Min(MIN_LENGTH_VALUE_FOR_VOLUME_WEIGHT, {
    message: `The weight of a product must be greater than ${MIN_LENGTH_VALUE_FOR_VOLUME_WEIGHT}`,
  })
  @Max(MAX_LENGTH_VALUE_FOR_VOLUME_WEIGHT, {
    message: `The weight of a product must be less than ${MAX_LENGTH_VALUE_FOR_VOLUME_WEIGHT}`,
  })
  @ApiProperty({
    name: 'weight',
    description: 'weight of a product',
    type: 'decimal',
    example: '0.500',
  })
  weight: number;

  /**
   * @description quantity of a unit of the product
   */
  @IsNotEmpty({ message: 'The quantity of product cannot be empty' })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
      maxDecimalPlaces: DECIMAL_SCALE_VALUE,
    },
    {
      message:
        'The quantity of a product must be of type number (decimal) and contain only three decimal places after the separator',
    },
  )
  @Min(MIN_VALUE_FOR_QUANTITY, {
    message: `The quantity of a product must be greater than ${MIN_VALUE_FOR_QUANTITY}`,
  })
  @Max(MAX_VALUE_FOR_QUANTITY, {
    message: `The quantity of a product must be less than ${MAX_VALUE_FOR_QUANTITY}`,
  })
  @ApiProperty({
    name: 'quantity',
    description: 'quantity of a product',
    type: 'bigint',
    example: '2',
  })
  quantity: number;

  /**
   * @description product type of a product
   */
  @IsEnum(ProductType)
  @IsNotEmpty({ message: 'The product type of a product cannot be empty' })
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
