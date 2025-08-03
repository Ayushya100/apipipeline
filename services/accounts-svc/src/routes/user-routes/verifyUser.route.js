'use strict';

import { logger, buildApiResponse } from '@ayushya100/common-node-lib';
import controllers from '../../controllers/index.js';

const log = logger('Router: verify-user');
const userController = controllers.userController;

// API Handler Function
const verifyUserEmail = async (req, res, next) => {
  try {
    log.info('Verify user email operation initiated!');

    const userId = req.params.userId;
    const token = req.params.token;

    log.info('Call controller function to check if the requested user exists');
    const isUserAvailable = await userController.getUserInfoById(userId);

    let isAlreadyVerified = false;
    let response;
    if (isUserAvailable.data.isEmailVerified) {
      log.info('User already verified');
      isAlreadyVerified = true;
      response = isUserAvailable;
    }

    if (!isAlreadyVerified) {
      log.info('Call controller function to verify user email via the provided token');
      const verifyUser = await userController.verifyUserToken(userId, token, isUserAvailable.data);
      response = verifyUser;
    }

    log.success('User email verification completed successfully!');
    res.status(200).json(buildApiResponse(response));
  } catch (err) {
    if (err.statusCode === '500') {
      log.error(`Error occurred while processing the request in router. Error: ${JSON.stringify(err)}`);
    } else {
      log.error(`Failed to complete the request. Error: ${JSON.stringify(err)}`);
    }
    next(err);
  }
};

export default verifyUserEmail;
