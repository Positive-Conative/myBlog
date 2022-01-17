import { Request, Response, NextFunction } from 'express';
import { boardRepo } from '../models/repository/boardRepo';
import { groupRepo } from '../models/repository/groupRepo';
import { userRepo } from '../models/repository/userRepo';
// import { boardGroupRepo } from '../models/repository/map-board-group';
// import chkData from '../lib/chkData';
import chkData from '../lib/checkData';
import {
    addBoardDto,
    boardKeyDto,
    setBoardFlagDto,
    modifyBoardDto,
    newBoardDto,
    boardVarOpt
} from '../interfaces/boardDto';

const bRepo = new boardRepo();
const gRepo = new groupRepo();
const aRepo = new userRepo();
// const bgRepo = new boardGroupRepo();

const boardController = {
    // 게시글 추가
    addBoard: async (req: Request, res: Response, next: NextFunction) => {
        const bodyData: addBoardDto = {
            group:      { "g_idx": parseInt(req.body.groupIdx, 10) || -1 },
            user:       { "u_email": req.body.userEmail || '' },
            b_title:    req.body.title,
            b_content:  req.body.content,
            b_flag:     0,
        }

        // 파라미터 Check
        if (chkData(bodyData, boardVarOpt) === false) {
            return next('API002');
        }

        // 유저 존재 여부 확인
        if (! await aRepo.findUserOne(bodyData.user.u_email)) {
            return next('API200');
        }

        // 그룹 존재 여부 확인
        if (! await gRepo.getGroupOne({g_idx: bodyData.group.g_idx})) {
            return next('API201');
        }

        await bRepo.addBoard(bodyData);
        return res.json({ "message": "처리 완료!" });
    },

    getBoardInfo: async (req: Request, res: Response, next: NextFunction) => {
        const bodyData: boardKeyDto = {
            b_idx : parseInt(req.params.boardIdx, 10) || -1
        };

        // 파라미터 Check
        if (chkData(bodyData, boardVarOpt) === false) {
            return next('API002');
        }

        // Board 찾을 수 있는지 확인
        const result = await bRepo.findBoardOne({b_idx: bodyData.b_idx});
        if(result === undefined) {  
            return next('API202');
        }

        // 게시물 플래그에 따른 Switch
        switch(result.flag) {
            case 0:     // 정상
                delete result.flag;
                return res.json({result, "message": "정상적으로 조회되었습니다."});
            
            case 1:     // 삭제된
                return next('API302');
        }
    },

    setBoardFlag: async (req: Request, res: Response, next: NextFunction) => {
        const bodyData : setBoardFlagDto = {
            b_idx : parseInt(req.params.boardIdx, 10) || -1,
            b_flag: req.body.state,
        }

        // 파라미터 Check
        if (chkData(bodyData, boardVarOpt) === false) {
            return next('API002');
        }

        // Board 존재 여부 확인
        if(! await bRepo.findBoardOne({b_idx: bodyData.b_idx})) {  
            return next('API202');
        }

        await bRepo.modifyBoardFlag(bodyData);
        res.json({"message": "정상적으로 처리되었습니다."});
    },

    modifyBoard: async (req: Request, res: Response, next: NextFunction) => {
        const bodyData: modifyBoardDto = {
            group:      { "g_idx": parseInt(req.body.groupIdx, 10) || -1 },
            user:       { "u_email": req.body.userEmail || '' },
            b_idx:      parseInt(req.params.boardIdx, 10) || -1,
            b_title:    req.body.title,
            b_content:  req.body.content,
            b_flag:     0,
        }

        // 파라미터 Check
        if (chkData(bodyData, boardVarOpt) === false) {
            return next('API002');
        }

        // 유저 존재 여부 확인
        if (! await aRepo.findUserOne(bodyData.user.u_email)) {
            return next('API200');
        }

        // Board 존재 여부 확인
        const result = await bRepo.findBoardOne({b_idx: bodyData.b_idx});
        if (! result) {  
            return next('API202');
        }

        // 해당 사용자인지 확인
        if (result.email !== bodyData.user.u_email) {
            return next('API403');
        }

        // 그룹 존재 여부 확인
        if (! await gRepo.getGroupOne({g_idx: bodyData.group.g_idx})) {
            return next('API201');
        }

        // 수정
        await bRepo.modifyBoardInfo(bodyData);
        res.json({"message": "처리 완료!"});
    },

    getBoardNew: async (req: Request, res: Response, next: NextFunction) => {
        // 정녕 AS를 써야 하는가..
        const bodyData: newBoardDto = {
            standard: parseInt(req.query.standard as string, 10) || 0,
            interval: parseInt(req.query.interval as string, 10) || 3
        }

        // 파라미터 Check
        if (chkData(bodyData, boardVarOpt) === false) {
            return next('API002');
        }

        const result = await bRepo.getBoardNew(bodyData);
        res.json({result, "message": "처리 완료!"});
    }
}


export = boardController;