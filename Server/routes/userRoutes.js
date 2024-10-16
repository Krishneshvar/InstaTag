import express from 'express';
import { handleLogin, validateEmp } from '../controllers/userController.js';

const router = express.Router();

// POST route for login
router.post("/check-login", handleLogin);
router.post("/emp-login", validateEmp);

export default router;
