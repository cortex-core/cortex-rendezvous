const log = require('./../logging/log');
const BaseAdapter = require('./base-adapter');
const _ = require('lodash');

// TODO : Implement Ethereum Interfacing
class Ethereum extends BaseAdapter{

    /*
     * Execute a loop in thread which is pulling last item from queue
     */
    execute() {
        let last;
        while (last = this.main_processing_queue.pop()) {
            // TODO : Publish into bc. Probably, this will create a bottleneck. If framework supports multiple instance
            // TODO : or something similar, we could use to avoid bottleneck.
        }
    }
}

module.exports = Ethereum;