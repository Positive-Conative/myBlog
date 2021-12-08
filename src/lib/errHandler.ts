import express, { Router, Request, Response, NextFunction } from 'express';
const router: Router = express.Router();
import { errorDto } from '../interfaces/errorDto';
const errorList = require('../config/errorList');

// export default (errCode: number, req: Request, res: Response) => {
//   console.log(errCode, "AAAAAAAAA")
//   // console.log(typeof errorList[errCode])
//   // const errResult: errorDto = errorList[errCode];
//   // console.log(errResult)
//   // 
// }

export default (errNum: any, req: Request, res: Response, next: NextFunction) => {
  const errResult: errorDto = errorList[errNum] || errorList['API999'];
  return res.status(errResult.httpStatus).json({
    "code"    :errResult.code,
    "message" :errResult.clientMsg
  });
};