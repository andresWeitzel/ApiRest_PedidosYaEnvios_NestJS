/* eslint-disable prettier/prettier */
//External
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Length, Min } from 'class-validator';
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

@Entity({ name: 'products' })
@ApiTags('Product')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  @IsNotEmpty({ message: 'The id cannot be empty' })
  @IsInt({ message: 'The id must be of type integer' })
  @Min(1, { message: 'ID value must be greater than zero' })
  @ApiProperty({
    name: 'id',
    description: 'identifier for a product',
    type: 'int',
    minimum: 1,
    maximum: 999999999,
    nullable: false,
    example: '12',
  })
  id: number;

  @Column({
    name: 'value',
    type: 'decimal',
    precision: 6,
    scale: 3,
    nullable: false,
  })
  @IsNotEmpty()
  @ApiProperty({
    name: 'value',
    description: 'price value of a product',
    type: 'decimal',
    example: '4.378',
  })
  value: number;

  @Column({ name: 'description', length: 700, nullable: false })
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

  @Column({ name: 'sku', length: 50, nullable: false })
  @IsNotEmpty()
  @ApiProperty({
    name: 'sku',
    description: 'sku of a product',
    type: 'string',
    minLength: 1,
    maxLength: 50,
    example: 'JJUS78A',
  })
  sku: string;

  @Column({
    name: 'volume',
    type: 'decimal',
    precision: 6,
    scale: 3,
    nullable: false,
  })
  @IsNotEmpty()
  @ApiProperty({
    name: 'volume',
    description: 'volume of a product',
    type: 'decimal',
    example: '0.500',
  })
  volume: number;

  @Column({
    name: 'weight',
    type: 'decimal',
    precision: 6,
    scale: 3,
    nullable: false,
  })
  @IsNotEmpty()
  @ApiProperty({
    name: 'weight',
    description: 'weight of a product',
    type: 'decimal',
    example: '0.500',
  })
  weight: number;

  @Column({
    name: 'quantity',
    type: 'int',
    nullable: false,
  })
  @IsNotEmpty()
  @ApiProperty({
    name: 'quantity',
    description: 'quantity of a product',
    type: 'int',
    example: '2',
  })
  quantity: number;

  @Column({
    name: 'product_type',
    type: 'enum',
    enum: ProductType,
    default: ProductType.STANDARD,
    nullable: false,
  })
  @IsNotEmpty()
  @ApiProperty({
    name: 'productType',
    description: 'type of a product',
    type: 'enum',
    example: 'STANDARD (only enum: STANDARD, FRAGILE or COLD)',
  })
  productType: ProductType;

  @CreateDateColumn({
    name: 'creation_date',
    type: 'datetime',
    nullable: false,
  })
  @IsNotEmpty()
  @ApiProperty({
    name: 'creationDate',
    description: 'creation date for a product',
    type: 'string',
    minLength: 4,
    maxLength: 50,
    example: '2023-02-17T00:47:58.000Z',
  })
  creationDate: Date;

  @UpdateDateColumn({ name: 'update_date', type: 'datetime', nullable: false })
  @IsNotEmpty()
  @ApiProperty({
    name: 'updateDate',
    description: 'update date for a product',
    type: 'string',
    minLength: 4,
    maxLength: 50,
    example: '2023-02-17T00:47:58.000Z',
  })
  updateDate: Date;

  // @OneToMany(()=> UserAddress, (userAddress) => userAddress.user)
  // userAddress: UserAddress[];
}
