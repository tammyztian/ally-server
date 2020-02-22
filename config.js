'use strict';

module.exports = {
      PORT: process.env.PORT || 8080,
      CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
      DATABASE_URL:
        process.env.DATABASE_URL || 'mongodb://localhost/thinkful-backend',
      TEST_DATABASE_URL:
        process.env.TEST_DATABASE_URL ||
        'mongodb://localhost/thinkful-backend-test',
      AWS_REGION: process.env.REGION,
      AWS_ENDPOINT: process.env.ENPOINT,
      AWS_ACCESS_KEY: process.env.ACCESS_KEY_ID,
      AWS_SECRET: process.env.SECRET_ACCESS_KEY



};
