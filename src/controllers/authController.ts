import { Request, Response, NextFunction } from 'express';
import chkChar from '../lib/chkChar';
import { userRepo } from '../models/repository/userRepo';

import {
    addAuthDto
} from '../interfaces/authDto';

const aRepo = new userRepo();
const authController = {
    // 유저 추가
    addUser: async (req: Request, res: Response, next: NextFunction) => {
        const bodyData: addAuthDto = {
            u_email: req.body.userId,
            u_password: req.body.userPw,
            u_name: req.body.userName,
            u_nickname: req.body.userNick,
            u_flag: 0,
            u_permission: 'default',
        }

        // 파라미터 Check
        if (chkChar(bodyData) === false || bodyData.u_email.indexOf('@') === -1) {
            return next('API002');
        }

        // 유저 중복 여부 확인 (중복 확인)
        if (await aRepo.findUserOne(bodyData.u_email)) {
            return next('API100');
        }

        await aRepo.addUser(bodyData);
        res.json({ "message": "처리 완료!" });
    },

    // getUserInfo: async(req: Request, res: Response, next: NextFunction) => {

    //     const u_email = req.body.userId;

    //      // 잘못된 파라미터?
    //     if(chkChar(u_email) === false) {
    //         return next('API002');
    //     }

    //     const result = await aRepo.findUserOne(u_email);
    //     if(result === undefined) {
    //         return next('API200');
    //     }

    //     // 비공개 유저인지 확인하고, 정상이라면 flag 지움 처리
    //     if(result.flag === 1) {
    //         return next('API300');
    //     } else {
    //         delete result.flag;
    //     }


    //     res.json({result, "message": "정상적으로 조회되었습니다."});
    // },

    // setUserFlag: async (req: Request, res: Response, next: NextFunction) => {
    //     const bodyData : setAuthFlagDto = {
    //         u_email: req.body.userId,
    //         u_flag: req.body.state,
    //     }

    //     if(chkChar(bodyData) === false || bodyData.u_flag in [0, 1, 2] === false ) {
    //         return next('API002');
    //     }

    //     await aRepo.modifyUserFlag(bodyData);
    //     res.json({"message": "정상적으로 처리되었습니다."});        
    // },

    // modifyUser: async (req: Request, res: Response, next: NextFunction) => {
    //     const bodyData: modifyAuthDto = {
    //         u_email: req.body.userId,
    //         u_password: req.body.userPw,
    //         u_name: req.body.userName,
    //         u_nickname: req.body.userNick,
    //     }

    //     // 파라미터 Check
    //     if(chkChar(bodyData) === false || bodyData.u_email.indexOf('@') === -1) {
    //         return next('API002');
    //     }

    //     if(await aRepo.findUserOne(bodyData.u_email) === undefined) {
    //         return next('API200');
    //     }

    //     // 유저 존재 여부 확인 (중복 확인)
    //     const result = await aRepo.findUserOne(bodyData.u_email);
    //     if(result === undefined) {
    //         return next('API100');
    //     }

    //     await aRepo.modifyUserInfo(bodyData);
    //     res.json({"message": "정상적으로 처리되었습니다."});

    // },
}


export = authController;