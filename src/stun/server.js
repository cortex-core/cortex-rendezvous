const logger = require('./../logging/log');
const _ = require('lodash');
const stun = require('node-stun');

class StunServer {

    constructor() {
        let defaults = {
            primary: {
                host: '127.0.0.1',
                port: '3478'
            },
            secondary: {
                host: '127.0.0.2',
                port: '3479'
            }
        };
        this.server = stun.createServer(defaults);
        // Set log event handler
        this.server.on('log', this.logHandler);
    }

    start() {
        // Start listening
        this.server.listen();
    }

    logHandler(log) {
        logger.info(log.message);
    }
}

module.exports = StunServer;


