import express, { Router } from 'express';
const router: Router = express.Router();

import authController from '../controllers/authController';

// 가입된 유저 확인
router.get('/:userId', authController.getUserInfo);

// 회원가입
router.post('/signup', authController.addUser);

// 유저 상태 변경 (삭제 / 휴면)
router.delete('/:userId', authController.setUserFlag);

// 유저 정보 수정
router.put('/:userId', authController.modifyUser);

export default router;