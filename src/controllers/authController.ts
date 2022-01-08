import { Request, Response, NextFunction } from 'express';
import chkData from '../lib/checkData';
import { userRepo } from '../models/repository/userRepo';

import {
    addAuthDto,
    authKeyDto,
    setAuthFlagDto,
    modifyAuthDto,
    authVarOpt
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

        // 파라미터 체크
        if(chkData(bodyData, authVarOpt) === false) {
            return next('API002');
        }

        // 유저 중복 여부 확인 (중복 확인)
        if (await aRepo.findUserOne(bodyData.u_email)) {
            return next('API100');
        }

        await aRepo.addUser(bodyData);
        return res.json({ "message": "처리 완료!" });
    },

    getUserInfo: async(req: Request, res: Response, next: NextFunction) => {
        const bodyData: authKeyDto = {
            u_email : req.params.userId
        };

        // 파라미터 체크
        if(chkData(bodyData, authVarOpt) === false) {
            return next('API002');
        }
        
        // 유저 확인
        const result = await aRepo.findUserOne(bodyData.u_email);
        if(result === undefined) {
            return next('API200');
        }

        // 유저 플래그에 따른 Switch
        switch(result.flag) {
            case -1:    // 이메일 인증 전
                return next('API400');

            case 0:     // 정상
                delete result.flag;
                return res.json({result, "message": "정상적으로 조회되었습니다."});
            
            case 1:     // 휴면
                return next('API401');
            
            case 2:     // 탈퇴 예정
                return next('API402');
        }
    },

    setUserFlag: async (req: Request, res: Response, next: NextFunction) => {
        const bodyData : setAuthFlagDto = {
            u_email: req.params.userId || '',
            u_flag:  req.body.state || -1,
        }

        // 파라미터 체크
        if(chkData(bodyData, authVarOpt) === false) {
            return next('API002');
        }

        await aRepo.modifyUserFlag(bodyData);
        return res.json({"message": "정상적으로 처리되었습니다."});        
    },

    modifyUser: async (req: Request, res: Response, next: NextFunction) => {
        const bodyData: modifyAuthDto = {
            u_email: req.params.userId,
            u_password: req.body.userPw,
            u_name: req.body.userName,
            u_nickname: req.body.userNick,
        }

        // 파라미터 체크
        if(chkData(bodyData, authVarOpt) === false) {
            return next('API002');
        }


        // ---- 이 아랫부분부터 중복, 함수 하나 만드는게 좋아보임 (정상일때만 특수처리) -----
        // 유저 확인
        const result = await aRepo.findUserOne(bodyData.u_email);
        if(result === undefined) {
            return next('API200');
        }

        // 유저 플래그에 따른 Switch
        switch(result.flag) {
            case -1:    // 이메일 인증 전
                return next('API400');

            case 0:     // 정상
                await aRepo.modifyUserInfo(bodyData);
                return res.json({"message": "정상적으로 처리되었습니다."});
            
            case 1:     // 휴면
                return next('API401');
            
            case 2:     // 탈퇴 예정
                return next('API402');
        }
        
    },
}




export = authController;