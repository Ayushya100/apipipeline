'use strict';

import { verifyUsernameEmailAlreadyTaken, registerNewUser } from './registerUser.controller.js';
import { getUserInfoById } from './getUserInfo.controller.js';

export default {
  verifyUsernameEmailAlreadyTaken,
  registerNewUser,
  getUserInfoById,
};
