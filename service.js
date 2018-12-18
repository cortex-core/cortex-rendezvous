const init_resources = require('./src/resource/resources');
const express = require('express');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const log = require('./src/logging/log');
const Blockchain = require('./src/blockchain/api');


let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(validator());

init_resources(app, new Blockchain());
 
app.listen(8080, function() {
    log.info("API listening 8080");
});

module.exports = app;