'use strict';

import { logger, convertPrettyStringToId, convertToNativeTimeZone } from '@ayushya100/common-node-lib';
import { fetchUserMetaInfo, verifyUserEmail } from '../../db/user.db.js';
import { generateEmailVerificationCode } from './verificationCode.controller.js';

const log = logger('Controller: verify-user');

const verifyUserToken = async (userId, token, userInfo) => {
  try {
    log.info('Controller function to verify the user with the provided token initiated');
    userId = convertPrettyStringToId(userId);

    log.info('Call db query to fetch user meta info.');
    let userMetaInfo = await fetchUserMetaInfo(userId);
    if (userMetaInfo.rowCount === 0) {
      log.error('No user meta info found for the provided user id');
      throw {
        status: 404,
        message: 'No user meta info found for the provided user id.',
      };
    }

    userMetaInfo = userMetaInfo.rows[0];
    if (userMetaInfo.verification_token !== token) {
      log.error('User verification token invalid');
      throw {
        status: 400,
        message: 'User email verification code invalid',
      };
    }

    let message = '';
    const currentTime = new Date(Date.now());
    if (currentTime > userMetaInfo.verification_token_exp) {
      log.error('Verification token has been expired');
      const verificationCodeGenerated = await generateEmailVerificationCode(userId);

      message = 'Verification token has been expired';
      const resData = {
        ...userInfo,
      };
      if (!verificationCodeGenerated.isValid) {
        message += '. Failed to generate the verification code. Try logging in to verify your email';
        resData['verification'] = {};
      } else {
        resData['verification'] = {
          verificationToken: verificationCodeGenerated.rows[0].verification_token,
          verificationTokenExp: convertToNativeTimeZone(verificationCodeGenerated.rows[0].verification_token_exp),
        };

        // TODO: Send new mail for verification
        // await sendVerificationMailToUser(resData);

        message += ' and new verification email has been sent to your email id.';
      }

      throw {
        status: 410,
        message: message,
        data: [resData],
      };
    }

    log.info('Complete user verification');
    let isEmailVerified = await verifyUserEmail(userId);
    isEmailVerified = isEmailVerified.rows[0];

    const emailData = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      tableData: [
        {
          name: 'First Name',
          description: userInfo.firstName,
        },
        {
          name: 'Last Name',
          description: userInfo.lastName || 'No data provided',
        },
        {
          name: 'Username',
          description: userInfo.username,
        },
        {
          name: 'Registered Email Id',
          description: userInfo.email,
        },
        {
          name: 'Account Creation Date',
          description: userInfo.createdDate.split(' ')[0],
        },
        {
          name: 'Account Verified',
          description: 'Yes',
        },
      ],
    };

    // TODO: Send Account verification confirmation mail to the user
    // await sendVerificationConfirmationMailToUser(emailData);

    log.success('User email has been verified successfully.');
    return {
      status: 200,
      message: 'Email is verified',
      data: {
        isEmailVerified: isEmailVerified.is_verified,
      },
    };
  } catch (err) {
    if (err.status && err.message) {
      throw err;
    }
    log.error('Error occurred while verifying the user email id via the provided token.');
    throw {
      status: 500,
      message: 'An Error occurred while verifying the user email id via the provided token.',
      errors: err,
    };
  }
};

export { verifyUserToken };
