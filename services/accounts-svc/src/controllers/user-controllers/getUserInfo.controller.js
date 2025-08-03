'use strict';

import { logger, convertPrettyStringToId, convertIdToPrettyString, convertToNativeTimeZone } from '@ayushya100/common-node-lib';
import { getUserInfo } from '../../db/index.js';

const log = logger('Controller: get-user-info');

const getUserInfoById = async (userId) => {
  try {
    log.info(`Controller for fetching user info for the requested user id: ${userId}`);

    log.info('Call db query to fetch user info by the id');
    userId = convertPrettyStringToId(userId);
    let userInfo = await getUserInfo(userId);
    if (userInfo.rowCount === 0) {
      log.error('No user found with the provided user id');
      throw {
        status: 404,
        message: 'No user found with the provided user id.',
      };
    }

    userInfo = userInfo.rows[0];
    const user = {
      id: convertIdToPrettyString(userInfo.id),
      role: userInfo.role_cd,
      firstName: userInfo.first_name,
      lastName: userInfo.last_name,
      username: userInfo.username,
      email: userInfo.email_id,
      loginType: userInfo.login_type,
      isEmailVerified: userInfo.is_verified,
      lastLogin: userInfo.last_login ? convertToNativeTimeZone(userInfo.last_login) : 'No data available',
      loginCount: userInfo.login_count,
      createdDate: convertToNativeTimeZone(userInfo.created_date),
      modifiedDate: convertToNativeTimeZone(userInfo.modified_date),
    };

    log.success('User info for the requested user id fetched successfully.');
    return {
      status: 200,
      message: 'User Profile fetched successfully',
      data: user,
    };
  } catch (err) {
    if (err.status && err.message) {
      throw err;
    }
    log.error(`Error occurred while fetching user info for the requested user id.`);
    throw {
      status: 500,
      mesage: 'An error occurred while fetching user info for the requested user.',
      errors: err,
    };
  }
};

export { getUserInfoById };
