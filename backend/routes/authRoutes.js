import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { registerValidation, loginValidation, validate } from '../middleware/validationMiddleware.js';

const router = express.Router();

// Apply validation middleware before controller
router.post('/register', registerValidation, validate, registerUser);
router.post('/login', loginValidation, validate, loginUser);

export default router;