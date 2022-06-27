import Router from 'express';
import * as UserController from '../controllers/userController.js';
import {loginValidation, registerValidation} from '../middleware/validaions.js';
import checkAuth from '../middleware/checkAuth.js';
import handleValidationErrors from "../middleware/handleValidationErrors.js";

const router = new Router();
router.post('/login', loginValidation, handleValidationErrors, UserController.login);
router.post('/register', registerValidation, handleValidationErrors, UserController.register);
router.get('/me', checkAuth, UserController.getMe);

export default router;