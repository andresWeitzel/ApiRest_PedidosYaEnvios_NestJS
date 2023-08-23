/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
//External
import { HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
//Const-vars
let code: number;
let msg: string;

export class ExceptionHandling {
  constructor() {}

  badRequest(@Res() res: Response, message: string) {
    code = HttpStatus.BAD_REQUEST;
    msg = message;
    return res.status(code).send({ msg: msg });
  }
  conflict(@Res() res: Response, message: string) {
    code = HttpStatus.CONFLICT;
    msg = message;
    return res.status(code).send({ msg: msg });
  }
}

//ADD TIME EXCEPTION SERVER