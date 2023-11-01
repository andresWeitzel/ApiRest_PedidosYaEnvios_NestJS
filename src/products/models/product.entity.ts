/* eslint-disable prettier/prettier */
//External
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
  IsDateString,
  Length,
  Max,
  Min,
} from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
//Enums
import { ProductType } from '../enums/productType';
//Const-vars
const NAME_VALUE_FOR_ID = 'id';
const NAME_VALUE_FOR_VALUE = 'value';
const NAME_VALUE_FOR_DESCRIPTION = 'description';
const NAME_VALUE_FOR_SKU = 'sku';
const NAME_VALUE_FOR_VOLUME = 'volume';
const NAME_VALUE_FOR_WEIGHT = 'weight';
const NAME_VALUE_FOR_QUANTITY = 'quantity';
const NAME_VALUE_FOR_PRODUCT_TYPE = 'product_type';
const NAME_VALUE_FOR_CREATION_DATE = 'creation_date';
const NAME_VALUE_FOR_UPDATE_DATE = 'update_date';
const MIN_VALUE_ID = 1;
const MAX_VALUE_ID = 999999999;
const DECIMAL_PRECISION_VALUE = 6;
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

@Entity({ name: 'products' })
@ApiTags('Product')
export class Product extends BaseEntity {
  /**
   * @description identifier of the product
   */
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  @IsNotEmpty({ message: `The ${NAME_VALUE_FOR_ID} cannot be empty` })
  @IsInt({ message: `The ${NAME_VALUE_FOR_ID} must be of type integer` })
  @Min(MIN_VALUE_ID, {
    message: `${NAME_VALUE_FOR_ID} value must be greater than zero`,
  })
  @ApiProperty({
    name: `${NAME_VALUE_FOR_ID}`,
    description: 'identifier for a product',
    type: 'bigint',
    minimum: MIN_VALUE_ID,
    maximum: MAX_VALUE_ID,
    nullable: false,
    example: '12',
  })
  id: number;

  /**
   * @description Value of the product. The maximum allowed value will depend on the insured coverage, and the calculation is made by summing up all the items submitted."
   */
  @Column({
    name: `${NAME_VALUE_FOR_VALUE}`,
    type: 'decimal',
    precision: DECIMAL_PRECISION_VALUE,
    scale: DECIMAL_SCALE_VALUE,
    nullable: false,
  })
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
    description: `Price ${NAME_VALUE_FOR_VALUE} of a product`,
    type: 'decimal',
    example: '4.378',
  })
  value: number;

  /**
   * @description description of the product
   */
  @Column({
    name: `${NAME_VALUE_FOR_DESCRIPTION}`,
    length: MAX_LENGTH_VALUE_FOR_DESCRIPTION,
    nullable: false,
  })
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
  @Column({
    name: `${NAME_VALUE_FOR_SKU}`,
    length: MAX_LENGTH_VALUE_FOR_SKU,
    nullable: false,
  })
  @IsNotEmpty({ message: `The ${NAME_VALUE_FOR_SKU} cannot be empty` })
  @IsString({ message: `The ${NAME_VALUE_FOR_SKU} must be of type string` })
  @Length(MIN_LENGTH_VALUE_FOR_SKU, MAX_LENGTH_VALUE_FOR_SKU, {
    message: `The value of the ${NAME_VALUE_FOR_SKU} must be between ${MIN_LENGTH_VALUE_FOR_SKU} and ${MAX_LENGTH_VALUE_FOR_SKU} characters`,
  })
  @ApiProperty({
    name: `${NAME_VALUE_FOR_SKU}`,
    description: `${NAME_VALUE_FOR_SKU} of a product`,
    type: 'string',
    minLength: MIN_LENGTH_VALUE_FOR_SKU,
    maxLength: MAX_LENGTH_VALUE_FOR_SKU,
    example: 'JJUS78A',
  })
  sku: string;

  /**
   * @description volume of the product in liters
   */
  @Column({
    name: `${NAME_VALUE_FOR_VOLUME}`,
    type: 'decimal',
    precision: DECIMAL_PRECISION_VALUE,
    scale: DECIMAL_SCALE_VALUE,
    nullable: false,
  })
  @IsNotEmpty({
    message: `The ${NAME_VALUE_FOR_VOLUME} of product cannot be empty`,
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
      maxDecimalPlaces: DECIMAL_SCALE_VALUE,
    },
    {
      message: `The ${NAME_VALUE_FOR_VOLUME} of a product must be of type number (decimal) and contain only three decimal places after the separator`,
    },
  )
  @Min(MIN_LENGTH_VALUE_FOR_VOLUME_WEIGHT, {
    message: `The ${NAME_VALUE_FOR_VOLUME} of a product must be greater than ${MIN_LENGTH_VALUE_FOR_VOLUME_WEIGHT}`,
  })
  @Max(MAX_LENGTH_VALUE_FOR_VOLUME_WEIGHT, {
    message: `The ${NAME_VALUE_FOR_VOLUME} of a product must be less than ${MAX_LENGTH_VALUE_FOR_VOLUME_WEIGHT}`,
  })
  @ApiProperty({
    name: `${NAME_VALUE_FOR_VOLUME}`,
    description: `${NAME_VALUE_FOR_VOLUME} of a product`,
    type: 'decimal',
    example: '0.500',
  })
  volume: number;

  /**
   * @description weight of a unit of the product in kilograms
   */
  @Column({
    name: `${NAME_VALUE_FOR_WEIGHT}`,
    type: 'decimal',
    precision: DECIMAL_PRECISION_VALUE,
    scale: DECIMAL_SCALE_VALUE,
    nullable: false,
  })
  @IsNotEmpty({
    message: `The ${NAME_VALUE_FOR_WEIGHT} of product cannot be empty`,
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
      maxDecimalPlaces: DECIMAL_SCALE_VALUE,
    },
    {
      message: `The ${NAME_VALUE_FOR_WEIGHT} of a product must be of type number (decimal) and contain only three decimal places after the separator`,
    },
  )
  @Min(MIN_LENGTH_VALUE_FOR_VOLUME_WEIGHT, {
    message: `The ${NAME_VALUE_FOR_WEIGHT} of a product must be greater than ${MIN_LENGTH_VALUE_FOR_VOLUME_WEIGHT}`,
  })
  @Max(MAX_LENGTH_VALUE_FOR_VOLUME_WEIGHT, {
    message: `The ${NAME_VALUE_FOR_WEIGHT} of a product must be less than ${MAX_LENGTH_VALUE_FOR_VOLUME_WEIGHT}`,
  })
  @ApiProperty({
    name: `${NAME_VALUE_FOR_WEIGHT}`,
    description: `${NAME_VALUE_FOR_WEIGHT} of a product`,
    type: 'decimal',
    example: '0.500',
  })
  weight: number;

  /**
   * @description quantity of a unit of the product
   */
  @Column({
    name: `${NAME_VALUE_FOR_QUANTITY}`,
    type: 'int',
    nullable: false,
  })
  @IsNotEmpty({
    message: `The ${NAME_VALUE_FOR_QUANTITY} of product cannot be empty`,
  })
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
      maxDecimalPlaces: DECIMAL_SCALE_VALUE,
    },
    {
      message: `The ${NAME_VALUE_FOR_QUANTITY} of a product must be of type number (decimal) and contain only three decimal places after the separator`,
    },
  )
  @Min(MIN_VALUE_FOR_QUANTITY, {
    message: `The ${NAME_VALUE_FOR_QUANTITY} of a product must be greater than ${MIN_VALUE_FOR_QUANTITY}`,
  })
  @Max(MAX_VALUE_FOR_QUANTITY, {
    message: `The ${NAME_VALUE_FOR_QUANTITY} of a product must be less than ${MAX_VALUE_FOR_QUANTITY}`,
  })
  @ApiProperty({
    name: `${NAME_VALUE_FOR_QUANTITY}`,
    description: `${NAME_VALUE_FOR_QUANTITY} of a product`,
    type: 'int',
    example: '2',
  })
  quantity: number;

  /**
   * @description product type of a product
   */
  @Column({
    name: `${NAME_VALUE_FOR_PRODUCT_TYPE}`,
    type: 'enum',
    enum: ProductType,
    default: ProductType.STANDARD,
    nullable: false,
  })
  @IsEnum(ProductType)
  @IsNotEmpty({
    message: `The ${NAME_VALUE_FOR_PRODUCT_TYPE} of a product cannot be empty`,
  })
  @ApiProperty({
    name: `${NAME_VALUE_FOR_PRODUCT_TYPE}`,
    description: 'type of a product',
    type: 'enum',
    example: 'STANDARD (only enum: STANDARD, FRAGILE or COLD)',
  })
  productType: ProductType;

  /**
   * @description creation date of a product
   */
  @CreateDateColumn({
    name: `${NAME_VALUE_FOR_CREATION_DATE}`,
    type: 'datetime',
    default: () => 'LOCALTIMESTAMP'
  })
  @IsNotEmpty({
    message: `The ${NAME_VALUE_FOR_CREATION_DATE} of a product cannot be empty`,
  })
  @IsDateString()
  @ApiProperty({
    name: `${NAME_VALUE_FOR_CREATION_DATE}`,
    description: `${NAME_VALUE_FOR_CREATION_DATE} for a product`,
    type: 'string',
    minLength: 4,
    maxLength: 50,
    example: '2023-02-17T00:47:58.000Z',
  })
  creationDate: Date;

  /**
   * @description update date of a product
   */
  @UpdateDateColumn({
    name: `${NAME_VALUE_FOR_UPDATE_DATE}`,
    type: 'datetime',
    default: () => 'LOCALTIMESTAMP'
  })
  @IsNotEmpty({
    message: `The ${NAME_VALUE_FOR_UPDATE_DATE} of a product cannot be empty`,
  })
  @IsDateString()
  @ApiProperty({
    name: `${NAME_VALUE_FOR_UPDATE_DATE}`,
    description: `${NAME_VALUE_FOR_UPDATE_DATE} for a product`,
    type: 'string',
    minLength: 4,
    maxLength: 50,
    example: '2023-02-17T00:47:58.000Z',
  })
  updateDate: Date;

  // @OneToMany(()=> UserAddress, (userAddress) => userAddress.user)
  // userAddress: UserAddress[];
}
