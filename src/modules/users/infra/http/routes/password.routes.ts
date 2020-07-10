import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotpasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPaswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', forgotPaswordController.create);
passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;
