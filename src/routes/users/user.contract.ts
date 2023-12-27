import Joi from '@hapi/joi';
import { EUserTypes } from '../../utils/common-constant';

const createUserContract = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  type: Joi.string().valid(EUserTypes.AMDIN, EUserTypes.DEFAULT).required(),
});

const getUsersContract = Joi.object({
  page: Joi.number().min(1),
  take: Joi.number().min(2).max(50),
});

const deleteUserContract = Joi.object({
  id: Joi.string().uuid().required(),
});

export { getUsersContract, createUserContract, deleteUserContract };
