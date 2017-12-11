const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParse = require('body-parser')

const app = express()

require('./config/db')

app.use(logger('dev'))

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

const port = 3001

app.listen(port, () => {
    console.log(`Express app running on port ${port}`);
});