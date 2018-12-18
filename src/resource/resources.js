const TasksResource = require('./tasks');

module.exports = function(express_app, blockchain){
    const tasks_resource = new TasksResource(blockchain);
    express_app.use('/tasks', tasks_resource.register());
};