import express, { Router } from 'express';
const router: Router = express.Router();

import boardController from '../controllers/boardController';

// 게시글 확인
router.get('/one/:boardIdx', boardController.getBoardInfo);

// Board 추가
router.post('/add/:groupIdx', boardController.addBoard);

// 게시글 상태 변경
router.delete('/:boardIdx', boardController.setBoardFlag);

// // 유저 정보 수정
// router.put('/modify', boardController.modifyBoard);

export default router; 