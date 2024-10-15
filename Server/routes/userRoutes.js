import express from 'express';
import { handleLogin } from '../controllers/userController.js';

const router = express.Router();

// POST route for login
router.post("/check-login", handleLogin);

export default router;
