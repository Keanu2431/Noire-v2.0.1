const express = require('express');

const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');
const DB = process.env.DATA_BASE.replace(
  '<password>',
  process.env.DATA_BASE_PASSWORD
);
console.log(app.get('env'));

mongoose.connect(DB);
console.log('Connected To DB');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`running on port:${port}`);
});
// use this to periodicallyy reset the server and update database
// https://www.npmjs.com/package/node-schedule
