import express from 'express';
import { loginUser, getUserVehicles, getVehicleDetails } from '../controllers/loginController.js'
import { registerUser } from '../controllers/registerController.js';
import { empLoginController } from '../controllers/empLoginController.js';
const router = express.Router();

router.post('/login/user', loginUser);
router.post('/register/user', registerUser);
router.post('/login/emp', empLoginController);

// Dashboard
router.get('/user-details/:user_id', getUserVehicles);
router.get('/vehicle-details/:vehicle_no', getVehicleDetails);


export default router;
