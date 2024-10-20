import express from 'express';
import { loginUser, loginEmployee, getUserVehicles, getVehicleDetails } from '../controllers/loginController.js'
const router = express.Router();

router.post('/login/user', loginUser);
router.post('/login/employee', loginEmployee);

// Dashboard
router.get('/user-details/:user_id', getUserVehicles);
router.get('/vehicle-details/:vehicle_no', getVehicleDetails);

export default router;
