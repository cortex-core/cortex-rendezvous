const init_resources = require('./src/resource/resources');
const express = require('express');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const log = require('./src/logging/log');
const AuthClient = require('./src/auth/auth');
const ChainClient = require('./src/chain/chain');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(validator());

init_resources(app, {
    chain : new ChainClient(),
    auth : new AuthClient()
});

app.listen(8081, function() {
    log.info("Gateway listening 8081");
});

module.exports = app;