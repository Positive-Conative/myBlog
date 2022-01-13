import express, { Router } from 'express';
const router: Router = express.Router();

import boardController from '../controllers/boardController';

// 게시글 확인
router.get('/one/:boardIdx', boardController.getBoardInfo);

// 새 게시글 확인
router.get('/new', boardController.getBoardNew);

// Board 추가
router.post('/add', boardController.addBoard);

// 게시글 상태 변경
router.delete('/:boardIdx', boardController.setBoardFlag);

// 게시글 정보 수정
router.put('/:boardIdx', boardController.modifyBoard);

export default router; 