import express from 'express';
import { loginUser, loginEmployee, getUserVehicles, getVehicleDetails } from '../controllers/loginController.js'
import { registerUser } from '../controllers/registerController.js';
const router = express.Router();

router.post('/login/user', loginUser);
router.post('/login/employee', loginEmployee);
router.post('/register/user', registerUser);

// Dashboard
router.get('/user-details/:user_id', getUserVehicles);
router.get('/vehicle-details/:vehicle_no', getVehicleDetails);

export default router;
