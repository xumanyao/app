const express = require('express');
const user = require('./user');


const app = express();
app.use('/user',user);
app.listen(9093,function () {
    console.log('the sever is running!');
});
