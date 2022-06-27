import Router from 'express';
import * as PostController from '../controllers/PostController.js';
import {postValidation} from '../middleware/validaions.js';
import checkAuth from "../middleware/checkAuth.js";
import handleValidationErrors from "../middleware/handleValidationErrors.js";

const router = new Router();
router.get('/', PostController.getAllPosts);
router.get('/:id', PostController.getOnePost);
router.post('/', checkAuth, postValidation, handleValidationErrors, PostController.createPost);
router.delete('/:id', checkAuth, PostController.deletePost);
router.patch('/:id', checkAuth, postValidation, handleValidationErrors, PostController.updatePost);

export default router;