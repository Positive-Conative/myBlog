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
            group:      { "g_idx": parseInt(req.params.groupIdx, 10) || -1 },
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

    // modifyBoard: async (req: Request, res: Response, next: NextFunction) => {
    //     const bodyData: modifyBoardDto = {
    //         b_idx:      req.body.idx || 0,
    //         b_writer:   req.body.writer,
    //         b_title:    req.body.title,
    //         b_content:  req.body.content,
    //         b_flag:     req.body.state,
    //         g_name:     req.body.g_name || undefined
    //     }

    //     // 잘못된 파라미터?
    //     if(chkChar(bodyData) === false || bodyData.b_flag in [0, 1, 2] === false ) {
    //         return next('API002');
    //     }

    //     // Board 찾을 수 있는지 확인
    //     if(await bRepo.findBoardOne(bodyData.b_idx) === undefined) {  
    //         return next('API202');
    //     }

    //     if(bodyData.g_name !== undefined) {
    //         if(await gRepo.findGroupOne(bodyData.g_name) === undefined) {
    //             return next('API201');
    //         }

    //         // 수정: Mapping
    //         const mapData: boardGroupDto = {
    //             b_idx  : bodyData.b_idx,
    //             g_name : bodyData.g_name
    //         }
    //         delete bodyData.g_name; // 아래 수정폼을 위해..

    //         bgRepo.deleteMap(mapData);
    //     }
    //     // console.log(bodyData)

    //     // 수정
    //     await bRepo.modifyBoardInfo(bodyData);

    //     res.json({"message": "처리 완료!"});

    // }
}


export = boardController;