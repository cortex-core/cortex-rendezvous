const log = require('./../logging/log');
const _ = require('lodash');

// TODO : Implement BlockChain Interfacing Base
class BaseAdapter {

    constructor(url) {
        this.url = url;
        this.main_processing_queue = [];
        // TODO : Run in a thread or something which is not going to block!
        this.execute();
    }

    /*
     *
     * This method should be able to assign a unique id for every task submitted. Probably, uniqueness
     * of Id will be provided by any hashing algorithm which is preferred. Formal definition can be
     * read from XXXXXXX doc.
     *
     * After creating task package, this method pushes proper definition with additional information into
     * main processing queue.
     *
     * Returns unique id assigned for task, average reward per task calculated, total reward,
     *
     */
    put(task) {
        // TODO : Assign a tracking uid probably needed to be defined in docs formally. 256 bits maybe.
        // TODO : Put task into queue which should be sync to published onto bc
        task.uid = 12; // Change with lodash alternative etc.
        this.main_processing_queue.push(task);
        return {"tracking_number" : task.uid, "needed_reward" : task.reward};
    }

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

module.exports = BaseAdapter;