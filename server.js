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
app.use(express.static('./Public'));

//home-page
app.get(`/`, (req, res) => {
  res.sendFile(__dirname + './index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`running on port:${port}`);
});
