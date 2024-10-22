import express from 'express';
import { loginUser, getUserVehicles, getVehicleDetails, getVehicleDetailsByInstaTag } from '../controllers/loginController.js'
import { registerUser } from '../controllers/registerController.js';
import { empLoginController, getEmployeeDetails } from '../controllers/empLoginController.js';
import { getVehicleExpenses } from '../models/userModel.js';
import { generateQR } from '../GenerateQR.js';
import { requestOTP } from '../controllers/mailController.js';
const router = express.Router();

router.post('/login/user', loginUser);
router.post('/login/emp', empLoginController);
router.post('/register/user', registerUser);
router.post('/request-otp', requestOTP);

// Dashboard
router.get('/user-details/:user_id', getUserVehicles);
router.get('/vehicle-details/:vehicle_no', getVehicleDetails);
router.get('/toll-emp/:empid', getEmployeeDetails);
router.get('/vehicle/:instatag_id',getVehicleDetailsByInstaTag);

// Vehicle data
router.get('/vehicle-expenses/:vehicle_no', getVehicleExpenses)
router.get('/generate-qr', generateQR)

export default router;
