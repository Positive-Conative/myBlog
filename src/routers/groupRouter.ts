import express, { Router } from 'express';
const router: Router = express.Router();

import groupController from '../controllers/groupController';

// 그룹 추가
// router.post('/add', groupController.addGroup);

// // 그룹 정보 확인
// router.post('/check', groupController.getGroupInfo);

// // 그룹 상태 변경
// router.delete('/state', groupController.setGroupFlag);

// // 그룹 정보 수정
// router.put('/modify', groupController.modifyGroup);

export default router; 