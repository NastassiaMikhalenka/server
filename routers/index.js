import Router from 'express';
import userRouter from './userRouter.js';
import postRouter from "./postRouter.js";
import uploadRouter from "./uploadRouter.js";
import tagsRouter from "./tagsRouter.js";
import commentsRouter from "./commentsRouter.js";

const router = new Router();

router.use('/auth', userRouter);
router.use('/posts', postRouter);
router.use('/upload', uploadRouter);
router.use('/tags', tagsRouter);
router.use('/comments', commentsRouter);

export default router;