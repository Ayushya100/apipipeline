'use strict';

import bcrypt from 'bcrypt';
import { logger, convertPrettyStringToId, convertToNativeTimeZone } from '@ayushya100/common-node-lib';
import { isUsernameEmailInUse, fetchDefaultUserRole, createNewUser } from '../../db/index.js';
import { SALT_ROUNDS } from '../../constants.js';
import { getUserInfoById } from './getUserInfo.controller.js';
import { generateEmailVerificationCode } from './verificationCode.controller.js';

const log = logger('Controller: register-user');

const verifyUsernameEmailAlreadyTaken = async (payload) => {
  try {
    log.info('Controller for verifying if username or email requested available to use has been activated');

    log.info('Call db query to check if username and email available to use by new user.');
    const data = await isUsernameEmailInUse(payload.username, payload.emailId);

    if (data.rowCount > 0) {
      log.error('Username or Email Id already taken by another user. Cannot proceed further!');
      throw {
        status: 409,
        message: 'User with username or email already exists.',
      };
    }

    log.success('Username and Email Id provided are valid to be used for registering new user.');
    return {
      status: 200,
      message: 'Username and Email Id provided are valid to be used for registering new user.',
      data: { data },
    };
  } catch (err) {
    if (err.status && err.message) {
      throw err;
    }
    log.error('Error while validating if the username or email already taken!');
    throw {
      status: 500,
      message: 'An Error occurred while validating if the username or email already taken.',
      errors: err,
    };
  }
};

const getDefaultUserRole = async () => {
  try {
    log.info('Controller function to retrieve the default user role has been activated');
    log.info('Call db query to fetch default user role.');

    const data = await fetchDefaultUserRole();

    if (data.rowCount === 0) {
      log.error('No default user role found. Cannot proceed further.');
      throw {
        status: 404,
        message: 'No user role found. Cannot proceed further.',
      };
    }

    log.success('Default User Role fetched successfully');
    return {
      rowCount: data.rowCount,
      rows: data.rows,
    };
  } catch (err) {
    if (err.status && err.message) {
      throw err;
    }
    log.error('Error while retrieving the default user role.');
    throw {
      status: 500,
      message: 'An error occurred while retrieving the default user role.',
      errors: err,
    };
  }
};

const registerNewUser = async (payload) => {
  try {
    log.info('Controller for registering new user with the system has been activated');
    const defaultUserRole = await getDefaultUserRole();

    log.info('User payload build operation initiated');
    const encPassword = await bcrypt.hash(payload.password, SALT_ROUNDS);
    const userPayload = [
      defaultUserRole.rows[0].id,
      payload.firstName.trim(),
      payload.lastName ? payload.lastName.trim() : null,
      payload.username.trim(),
      payload.emailId.trim(),
      encPassword,
      'EMAIL_PASSWORD',
    ];

    log.info('Call db query to register new user in system.');
    const data = await createNewUser(userPayload);

    log.info('Call db query to fetch the details about newly added user.');
    let userInfo = await getUserInfoById(data.rows[0].id);
    const userId = convertPrettyStringToId(userInfo.data.id);
    const verificationCodeGenerated = await generateEmailVerificationCode(userId);

    // TODO: Send new mail for verification
    // await sendVerificationMailToUser(resData);

    let message = 'User registered successfully';
    if (!verificationCodeGenerated.isValid) {
      message += '. Failed to generate the verification code. Try logging in to verify your email.';
      userInfo.data['verification'] = {};
    } else {
      userInfo.data['verification'] = {
        verificationToken: verificationCodeGenerated.rows[0].verification_token,
        verificationTokenExp: convertToNativeTimeZone(verificationCodeGenerated.rows[0].verification_token_exp),
      };
      message += ' and verification email has been sent to your email id.';
    }

    log.success('New user created successfully.');
    console.log(userInfo);
    return {
      status: 201,
      message: message,
      data: userInfo.data,
    };
  } catch (err) {
    if (err.status && err.message) {
      throw err;
    }
    log.error(`Error while creating a new user in system.`);
    throw {
      status: 500,
      message: 'An Error occurred while registering a new user in system.',
      errors: err,
    };
  }
};

export { verifyUsernameEmailAlreadyTaken, registerNewUser };
