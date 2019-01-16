import express, { Router } from 'express';
const router: Router = express.Router();

import categoryController from '../controllers/categoryController';

// 카테고리 추가
router.post('/add', categoryController.addCategory);

// 카테고리 정보 확인
router.post('/check', categoryController.getCategoryInfo);

// // 카테고리 상태 변경
// router.delete('/state', groupController.setGroupFlag);

// // 유저 정보 수정
// router.put('/modify', groupController.modifyGroup);

export default router; 