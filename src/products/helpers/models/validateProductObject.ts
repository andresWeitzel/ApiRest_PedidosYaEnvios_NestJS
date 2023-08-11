/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
//External
import {
    validate
  } from 'class-validator';
  //Models 
  import { ProductDTO } from 'src/products/models/product.dto';
  //Const/vars
  let stackFieldsErrors:any;
  
  
  /**
   * @description Validation of all the properties of the Product class.
   * @param {object} objProduct object type
   * @returns an array object with the specific errors (constraints) of each class property
   * @example  [
      'The value of the site id must be between 2 and 20 characters',
      'The site id cannot be empty',
      'The value of the title must be between 2 and 100 characters',
      'The title cannot be empty'
    ]
   */
  export const validateProductObject = async (objProduct: ProductDTO) => {
    stackFieldsErrors = [];
  
    try {
  
      await validate(objProduct).then((errors) => {
        errors.map((e) => {
          for (let key in e.constraints) {
            stackFieldsErrors.push(e.constraints[key]);
          }
        })
      });
  
      return stackFieldsErrors;
  
    } catch (error) {
      console.error(`ERROR in function validateProductObject(). Caused by ${error} . Specific stack is ${error.stack} `);
    }
  
  }