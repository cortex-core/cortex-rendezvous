const TasksResource = require('./tasks');
const AuthResource = require('./auth');

module.exports = function(express_app, context){
    const tasks_resource = new TasksResource(context);
    const auth_resource = new AuthResource(context);
    express_app.use('/query_task', tasks_resource.register());
    express_app.use('/auth', auth_resource.register());
};