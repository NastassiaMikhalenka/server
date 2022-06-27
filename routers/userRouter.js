import Router from 'express';
import * as UserController from '../controllers/userController.js';
import {loginValidation, registerValidation} from '../middleware/validaions.js';
import checkAuth from '../middleware/checkAuth.js';

const router = new Router();
router.post('/login', loginValidation, UserController.login);
router.post('/register', registerValidation, UserController.register);
router.get('/me', checkAuth, UserController.getMe);

export default router;