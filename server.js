const express = require('express');

const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');
const DB = process.env.DATA_BASE.replace(
  '<PASSWORD>',
  process.env.DATA_BASE_PASSWORD
);
console.log(app.get('env'));
// console.log(DB);

console.log(process.env.DATA_BASE);
console.log(process.env.DATA_BASE_PASSWORD);
// mongoose.connect(DB);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`running on port:${port}`);
});
