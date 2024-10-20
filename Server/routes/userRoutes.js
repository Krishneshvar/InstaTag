import express from 'express';
import { loginUser, loginEmployee } from '../controllers/loginController.js'
const router = express.Router();

router.post('/login/user', loginUser);
router.post('/login/employee', loginEmployee);

export default router;
