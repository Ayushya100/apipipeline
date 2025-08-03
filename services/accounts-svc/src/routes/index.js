'use strict';

import healthCheck from './health.route.js';
import users from './user-routes/index.js';

export default {
  healthCheck,
  users,
};
