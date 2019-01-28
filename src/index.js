const express = require('express');

const path = require('path');


const app = express();

const {mongoose} = require('./database');

app.set('port',process.env.PORT||3000);

app.use(express.json());

app.use('/api/comic',require('./routes/comic.routes')); 

app.use(express.static(path.join(__dirname,'public')));

app.listen(app.get('port'));