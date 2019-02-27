import { Request, Response, NextFunction } from 'express';
import { categoryRepo } from '../models/repository/categoryRepo';
import { groupRepo } from '../models/repository/groupRepo';
import chkData from '../lib/chkData';

import {
    addGroupDto,
    groupKeyDto,
    modifyGroupDto,
    groupVarOpt
} from '../interfaces/groupDto';

const cRepo = new categoryRepo();
const gRepo = new groupRepo();
const groupController = {

    // 그룹 추가
    addGroup: async (req: Request, res: Response, next: NextFunction) => {
        const bodyData: addGroupDto = {
            category: { "c_name": req.body.categoryName || '' },
            g_name: req.body.groupName,
            g_memo: req.body.groupMemo,
            g_flag: 0
        };

        // 파라미터 Check
        if (chkData(bodyData, groupVarOpt) === false) {
            return next('API002');
        }

        // 카테고리 존재 여부 확인
        if (! await cRepo.findCategoryOne(bodyData.category.c_name)) {
            return next('API203');
        }

        // 그룹 중복 여부 확인
        if (await gRepo.findGroupOne(bodyData)) {
            return next('API101');
        }

        await gRepo.addGroup(bodyData);
        res.json({ "message": "처리 완료!" });
    },

    getGroupInfo: async (req: Request, res: Response, next: NextFunction) => {
        const bodyData: groupKeyDto = {
            g_name: req.body.groupName,
        };

        // 잘못된 파라미터?
        if (chkData(bodyData, groupVarOpt) === false) {
            return next('API002');
        }

        // 그룹 찾을 수 있는지 확인
        const result = await gRepo.findGroupOne(bodyData);
        if (result === undefined) {
            return next('API201');
        }

        // 비공개 그룹인지 확인하고, 정상이라면 flag 지움 처리
        if (result.flag === 1) {
            return next('API301');
        } else {
            delete result.flag;
        }

        res.json({ result, "message": "정상적으로 조회되었습니다." });
    },

    setGroupFlag: async (req: Request, res: Response, next: NextFunction) => {
        const bodyData: groupKeyDto = {
            g_name: req.body.groupName
        }

        // 잘못된 파라미터?
        if (chkData(bodyData, groupVarOpt) === false) {
            return next('API002');
        }

        // 그룹 찾을 수 있는지 확인
        const result = await gRepo.findGroupOne(bodyData);
        if (result === undefined) {
            return next('API201');
        }

        await gRepo.modifyGroupFlag(bodyData);
        res.json({ "message": "정상적으로 처리되었습니다." });
    },

    // modifyGroup: async(req: Request, res: Response, next: NextFunction) => {
    //     const bodyData: modifyGroupDto = {
    //         category: { "c_name": req.body.categoryName || '' },
    //         g_name: req.body.groupName,
    //         g_memo: req.body.groupMemo,
    //     };

    //     // 잘못된 파라미터?
    //     if (chkData(bodyData, groupVarOpt) === false) {
    //         return next('API002');
    //     }

    //     // 그룹 찾을 수 있는지 확인
    //     const result = await gRepo.findGroupOne(bodyData);
    //     if (result === undefined) {
    //         return next('API201');
    //     }

    //     await gRepo.modifyGroupInfo(bodyData);
    //     res.json({"message": "정상적으로 처리되었습니다."});
    // }
}


export = groupController;