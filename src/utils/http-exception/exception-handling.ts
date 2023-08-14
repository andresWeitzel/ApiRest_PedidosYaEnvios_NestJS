/* eslint-disable prettier/prettier */

import { BadRequestException, HttpStatus } from '@nestjs/common';

export class ExceptionHandling {
  constructor(message: string, statusCode: number) {
    switch (statusCode) {
      case HttpStatus.BAD_REQUEST:
        throw new BadRequestException({ message: message, time: new Date() });

      default:
        throw new BadRequestException('Forbidden');
    }
  }
}
