'use strict';

import { Service } from '@ayushya100/common-node-lib';
import dotenv from 'dotenv';
import { serviceConfig, USERS_API } from './constants.js';
import routes from './routes/index.js';

dotenv.config({
  path: './env',
});

class AccountService extends Service {
  registerPublicEndpoints() {
    this.app.get(`${USERS_API}/health`, routes.healthCheck);
    this.app.post(`${USERS_API}/register-user`, routes.users.registerUser);
    this.app.put(`${USERS_API}/verify-user/:userId/:token`, routes.users.verifyUserEmail);
  }
}

serviceConfig.HOST = process.env.HOST || serviceConfig.HOST;
serviceConfig.PORT = process.env.PORT || serviceConfig.PORT;
serviceConfig.PROTOCOL = process.env.PROTOCOL || serviceConfig.PROTOCOL;

const service = new AccountService(serviceConfig, true);
service.getUserContext();
service.buildConnection();
service.testConnection();
