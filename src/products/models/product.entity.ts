import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'products' })
@ApiTags('Product')
export class Product extends BaseEntity{
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  @ApiProperty({
    name: 'id',
    description: 'identifier for a product',
    type: 'number',
    minimum: 1,
    maximum: 999999999,
    example: '12',
  })
  id: number;

  @Column({ name: 'value', nullable: false, length: 50 })
  @IsNotEmpty()
  // @ApiProperty({
  //   name: 'value',
  //   description: 'price value of a product',
  //   type: 'string',
  //   minLength: 4,
  //   maxLength: 50,
  //   example: 'JAVIER GONZALEZ',
  // })
  value: string;

  description:string;

  sku:string;
  volume:number;
  weight:number;
  quantity:number;
  product_type:string;
 
  @CreateDateColumn({
    type: 'datetime',
    name: 'creation_date',
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

  @UpdateDateColumn({ type: 'datetime', name: 'update_date', nullable: false })
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

  // @Column({ name: 'first_name', nullable: false, length: 50 })
  // @IsNotEmpty()
  // @ApiProperty({
  //   name: 'firstname',
  //   description: 'firstname for a user',
  //   type: 'string',
  //   minLength: 4,
  //   maxLength: 50,
  //   example: 'JAVIER',
  // })
  // firstName: string;

  // @Column({ name: 'last_name', nullable: false, length: 50 })
  // @IsNotEmpty()
  // @ApiProperty({
  //   name: 'lastname',
  //   description: 'lastname for a user',
  //   type: 'string',
  //   minLength: 4,
  //   maxLength: 50,
  //   example: 'GONZALEZ',
  // })
  // lastName: string;

  // @Column({ name: 'email', nullable: false, length: 50 })
  // @IsEmail()
  // @ApiProperty({
  //   name: 'email',
  //   description: 'email for a user',
  //   type: 'string',
  //   minLength: 4,
  //   maxLength: 50,
  //   example: 'javier_gonzalez@gmail.com',
  // })
  // email: string;

  // @Column({ name: 'identification_type', nullable: false, length: 50 })
  // @IsNotEmpty()
  // @ApiProperty({
  //   name: 'identificationType',
  //   description: 'identification type for a user',
  //   type: 'string',
  //   minLength: 4,
  //   maxLength: 50,
  //   example: 'DNI',
  // })
  // identificationType: string;

  // @Column({ name: 'identification_number', nullable: false, length: 50 })
  // @IsNotEmpty()
  // @ApiProperty({
  //   name: 'identificationNumber',
  //   description: 'identification number for a user',
  //   type: 'string',
  //   minLength: 4,
  //   maxLength: 50,
  //   example: '389991221',
  // })
  // identificationNumber: string;

  // @Column({ name: 'country_id', nullable: false, length: 50 })
  // @IsNotEmpty()
  // @ApiProperty({
  //   name: 'countryId',
  //   description: 'country id for a user',
  //   type: 'string',
  //   minLength: 4,
  //   maxLength: 50,
  //   example: 'AR',
  // })
  // countryId: string;


  // @OneToMany(()=> UserAddress, (userAddress) => userAddress.user)
  // userAddress: UserAddress[];
}
