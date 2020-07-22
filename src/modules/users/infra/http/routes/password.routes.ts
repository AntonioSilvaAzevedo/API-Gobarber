import { Router } from 'express';
import {celebrate, Segments, Joi } from 'celebrate';


import ForgotPasswordController from '../controllers/ForgotpasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';
import { JoinColumn } from 'typeorm';

const passwordRouter = Router();
const forgotPaswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
 celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
    },
  }),
  forgotPaswordController.create
);

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
    resetPasswordController.create
  );

export default passwordRouter;
