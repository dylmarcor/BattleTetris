const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
// const favicon = require('serve-favicon')

require('dotenv').config()
require('./config/db')

const app = express()

app.use(require('./config/auth'))
app.use(logger('dev'))

// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/topscores', require('./routes/api/topscores'));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

var port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Express app running on port ${port}`);
});