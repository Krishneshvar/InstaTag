import express from 'express';
import { loginUser, getUserVehicles, getVehicleDetails, getVehicleDetailsByInstaTag } from '../controllers/loginController.js'
import { registerUser } from '../controllers/registerController.js';
import { empLoginController, forgotPasswordController, getEmployeeDetails } from '../controllers/empLoginController.js';
import { getVehicleExpenses } from '../models/userModel.js';
import { generateQR } from '../GenerateQR.js';
import handleTransaction from '../controllers/handleTransaction.js';
// import ForgotPassword from '../../emp-interface/src/components/AuthForm/forgotPassword.jsx';
const router = express.Router();

router.post('/login/user', loginUser);
router.post('/register/user', registerUser);
router.post('/login/emp', empLoginController);
// router.post('/forgot-password', ForgotPassword)

// Dashboard
router.get('/user-details/:user_id', getUserVehicles);
router.get('/vehicle-details/:vehicle_no', getVehicleDetails);

//Employee
router.get('/toll-emp/:empid', getEmployeeDetails);
router.get('/vehicle/:instatag_id',getVehicleDetailsByInstaTag);
router.post('/transaction',handleTransaction);

// Vehicle data
router.get('/vehicle-expenses/:vehicle_no', getVehicleExpenses)
router.get('/generate-qr', generateQR)

export default router;
