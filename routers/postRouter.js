import Router from 'express';
import * as PostController from '../controllers/PostController.js';
import {postCreateValidation} from '../middleware/validaions.js';
import checkAuth from "../middleware/checkAuth.js";

const router = new Router();
router.get('/', PostController.getAllPosts);
router.get('/:id', PostController.getOnePost);
router.post('/', checkAuth, postCreateValidation, PostController.createPost);
router.delete('/:id', checkAuth, PostController.deletePost);
router.patch('/:id', checkAuth, PostController.updatePost);

export default router;