import express, { Router } from 'express';
const router: Router = express.Router();

import categoryController from '../controllers/categoryController';

// 카테고리 정보 확인 - 1개
router.get('/one/:categoryName', categoryController.getCategoryInfo);

// 카테고리 확인 - 전체
router.get('/all', categoryController.getCategoryList);

// 카테고리 추가
router.post('/', categoryController.addCategory);

// 카테고리 정보 수정
router.put('/:categoryName', categoryController.modifyCategory);

// 카테고리 정보 삭제
router.delete('/:categoryName', categoryController.deleteCategory);


export default router; 