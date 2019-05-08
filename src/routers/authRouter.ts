import express, { Router } from 'express';
const router: Router = express.Router();

import authController from '../controllers/authController';
// import { addUser } from '../controllers/authController';


// 회원가입
router.post('/signup', authController.addUser);

// 가입된 유저 확인
// router.post('/check', authController.getUserInfo);

// 유저 상태 변경
// router.delete('/state', authController.setUserFlag);

// 유저 정보 수정
// router.put('/modify', authController.modifyUser);

export default router;