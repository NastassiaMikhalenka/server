import Router from 'express';
import userRouter from './userRouter.js';
import postRouter from "./postRouter.js";
import uploadRouter from "./uploadRouter.js";

const router = new Router();

router.use('/auth', userRouter);
router.use('/posts', postRouter);
router.use('/upload', uploadRouter);

export default router;