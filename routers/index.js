import Router from 'express';
import userRouter from './userRouter.js';
import postRouter from "./postRouter.js";

const router = new Router();

router.use('/auth', userRouter);
router.use('/posts', postRouter);

export default router;