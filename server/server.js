const express = require('express');
const user = require('./user');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user',user);
app.listen(9093,function () {
    console.log('the server is running!');
});
