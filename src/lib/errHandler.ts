import express, { Router, Request, Response, NextFunction } from 'express';
import { errorDto } from '../interfaces/errorDto';
const errorList = require('../config/errorList');

export default (errNum: any, req: Request, res: Response, next: NextFunction) => {
  const errResult: errorDto = errorList[errNum] || errorList['API999'];
  return res.status(errResult.httpStatus).json({
    "result"    : {
      "err_code": errResult.code,
    },
    "message" :errResult.clientMsg
  });
};