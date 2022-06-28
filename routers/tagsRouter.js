import Router from 'express';
import * as PostController from '../controllers/PostController.js';

const router = new Router();
router.get('/', PostController.getLastTags);

export default router;