import { Request, Response, NextFunction } from 'express';
// import { groupRepo } from '../models/repository/groupRepo';
import chkData from '../lib/chkData';

import { addCategoryDto } from '../interfaces/categoryDto';

// const gRepo = new groupRepo();
const categoryController = {
    // 그룹 추가
    addCategory : async (req: Request, res: Response, next: NextFunction) => {
        const bodyData: addCategoryDto = {
            c_name: req.body.categoryName || '',
            c_memo: req.body.categoryMemo || '',
        };

        console.log("come in")
        const checkOptions: object = {
            c_name: {
                type:               'string',
                min_size:           5,
                max_size:           20,
                blok_special:       true
            },
            c_memo: {
                type:               'string',
                max_size:           50,
                blok_special:       true
            },
        }

        if(chkData(bodyData, checkOptions) === false) {
            return next('API002');
        };

        console.log("ㅒㅏ")
        return;
    },
}


export = categoryController;