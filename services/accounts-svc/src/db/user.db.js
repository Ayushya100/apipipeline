'use strict';

import { exec } from '@ayushya100/common-node-lib';

const fetchDefaultUserRole = async () => {
  const query = `SELECT ID, ROLE_CD, ROLE_DESC, IS_ACTIVE, IS_DEFAULT
        FROM USER_ROLE
        WHERE IS_DELETED = false AND IS_ACTIVE = true AND IS_DEFAULT = true;`;

  return await exec(query);
};

const isUsernameEmailInUse = async (username, emailId) => {
  const query = `SELECT ID, FIRST_NAME, USERNAME, EMAIL_ID, IS_DELETED
        FROM USERS
        WHERE IS_DELETED = false AND USERNAME = ? AND EMAIL_ID = ?`;

  const params = [username, emailId];

  return await exec(query, params);
};

const createNewUser = async (payload) => {
  const query = `INSERT INTO USERS (ROLE_ID, FIRST_NAME, LAST_NAME, USERNAME, EMAIL_ID, PASSWORD, LOGIN_TYPE)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        RETURNING ID`;
  const params = payload;

  return await exec(query, params);
};

const getUserInfo = async (id) => {
  const query = `SELECT U.ID, R.ROLE_CD, U.FIRST_NAME, U.LAST_NAME, U.USERNAME, U.EMAIL_ID, U.LOGIN_TYPE, U.IS_VERIFIED
        , U.CREATED_DATE, U.MODIFIED_DATE, U.LOGIN_COUNT, U.LAST_LOGIN
        FROM USERS U
        INNER JOIN USER_ROLE R ON R.ID = U.ROLE_ID AND R.IS_DELETED = false
        WHERE U.ID = ? AND U.IS_DELETED = false;`;
  const params = [id];

  return await exec(query, params);
};

const registerEmailVerification = async (userId, verificationCode, verificationCodeExpiry) => {
  let query = `SELECT ID FROM USER_METADATA WHERE USER_ID = ?`;
  let params = [userId];
  let record = await exec(query, params);

  if (record.rowCount === 1) {
    query = `UPDATE USER_METADATA SET VERIFICATION_TOKEN = ?, VERIFICATION_TOKEN_EXP = ?
      WHERE ID = ?
      RETURNING VERIFICATION_TOKEN, VERIFICATION_TOKEN_EXP;`;
    params = [verificationCode, verificationCodeExpiry, record.rows[0].id];
    record = await exec(query, params);
  } else {
    query = `INSERT INTO USER_METADATA (USER_ID, VERIFICATION_TOKEN, VERIFICATION_TOKEN_EXP)
      VALUES (?, ?, ?)
      RETURNING VERIFICATION_TOKEN, VERIFICATION_TOKEN_EXP;`;
    params = [userId, verificationCode, verificationCodeExpiry];
    record = await exec(query, params);
  }

  return record;
};

export { fetchDefaultUserRole, isUsernameEmailInUse, createNewUser, getUserInfo, registerEmailVerification };
