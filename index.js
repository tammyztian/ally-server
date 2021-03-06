'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
let {router: dynamoRoute} = require('./dynamo');


const { PORT, CLIENT_ORIGIN } = require('./config');


const app = express();



app.use(
  cors({
    origin: `${CLIENT_ORIGIN}`
  })
);

app.use('/', dynamoRoute);

// app.use(
//   morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
//     skip: (req, res) => process.env.NODE_ENV === 'test'
//   })
// );


function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  // dbConnect();
  runServer();
}

module.exports = { app };
