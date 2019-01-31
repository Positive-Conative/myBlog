import express, { Router } from 'express';
const router: Router = express.Router();

import categoryController from '../controllers/categoryController';

// 카테고리 추가
router.post('/add', categoryController.addCategory);

// 카테고리 정보 확인 - 1개
router.post('/one', categoryController.getCategoryInfo);

// 카테고리 정보 확인 - 전부
router.post('/all', categoryController.getCategoryList);

// // 카테고리 상태 변경
// router.delete('/state', groupController.setGroupFlag);

// 카테고리 정보 수정
router.put('/modify', categoryController.modifyCategory);

// 카테고리 정보 삭제
router.delete('/delete', categoryController.deleteCategory);


export default router; 