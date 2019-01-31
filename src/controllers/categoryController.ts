import { Request, Response, NextFunction } from 'express';
import { categoryRepo } from '../models/repository/categoryRepo';
import chkData from '../lib/chkData';

import { addCategoryDto, categoryKeyDto, categoryVarOpt } from '../interfaces/categoryDto';

const cRepo = new categoryRepo();
const categoryController = {

    // 카테고리 추가
    addCategory : async (req: Request, res: Response, next: NextFunction) => {
        const bodyData: addCategoryDto = {
            c_name: req.body.categoryName || '',
            c_memo: req.body.categoryMemo || '',
        };

        // 파라미터 체크
        if(chkData(bodyData, categoryVarOpt) === false) {
            return next('API002');
        };

        // 중복 여부 확인
        if(await cRepo.findCategoryOne(bodyData)) {
            return next('API102');
        }

        // ORM 실행
        await cRepo.addCategory(bodyData);
        return res.json({"message": "처리 완료!"});
    },

    // 안쓸것 같지만 만들어둠 : 1개 조회 - 동일 이름의 카테고리 만들지?
    getCategoryInfo : async (req: Request, res: Response, next: NextFunction) => {
        const bodyData: categoryKeyDto = {
            c_name: req.body.categoryName || '',
        };

        // 파라미터 체크
        if(chkData(bodyData, categoryVarOpt) === false) {
            return next('API002');
        };

        // ORM 실행 - 존재 여부 확인
        const result = await cRepo.findCategoryOne(bodyData);
        if(result === undefined) {  
            return next('API203');
        }

        return res.json({"message": "조회 완료!", result});
    },

    // 전체 조회
    getCategoryList : async (req: Request, res: Response, next: NextFunction) => {
        // ORM 실행 
        const result = await cRepo.findCategoryAll();

        return res.json({"message": "조회 완료!", result});
    },

    // 수정
    modifyCategory: async(req: Request, res: Response, next: NextFunction) => {
        const bodyData: addCategoryDto = {
            c_name: req.body.categoryName || '',
            c_memo: req.body.categoryMemo || '',
        };

        // 파라미터 체크
        if(chkData(bodyData, categoryVarOpt) === false) {
            return next('API002');
        };

        // 존재 여부 확인
        if(! await cRepo.findCategoryOne(bodyData)) {
            return next('API203');
        }

        // ORM 실행 
        await cRepo.altCategory(bodyData);
        res.json({"message": "정상적으로 처리되었습니다."});
    },

    // 삭제 (flag 있을 필요 X)
    deleteCategory: async(req: Request, res: Response, next: NextFunction) => {
        const bodyData: categoryKeyDto = {
            c_name: req.body.categoryName || '',
        };

        // 파라미터 체크
        if(chkData(bodyData, categoryVarOpt) === false) {
            return next('API002');
        };

        // ORM 실행 - 존재 여부 확인
        const result = await cRepo.findCategoryOne(bodyData);
        if(result === undefined) {  
            return next('API203');
        }

        await cRepo.delCategory(bodyData);
        return res.json({"message": "삭제 완료!"});
    }

}


export = categoryController;