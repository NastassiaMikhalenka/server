import Router from 'express';
import * as CommentController from '../controllers/commentController.js';
import checkAuth from "../middleware/checkAuth.js";
const router = new Router();

router.get("/", CommentController.getAllComments);
router.get("/post/:id", CommentController.postComments);
router.post("/", checkAuth, CommentController.createComment);

export default router;