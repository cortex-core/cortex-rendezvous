const BaseResource = require('./base-resource');
const log = require('./../logging/log');
const _ = require('lodash');

class TasksResource extends BaseResource {

  constructor(context) {
    super(context);
  }
  query(req, res) {

      log.debug("Task Query endpoint is being called");
      req.checkHeaders('access_token', 'access_token is required!').notEmpty();
      req.checkParams('task', 'task is required!').notEmpty();
      req.checkParams('role', 'role is required!').notEmpty();
      const errors = req.validationErrors();
      if (errors) {
          res.status(403).send(_.map(errors, err => { return err.msg; }));
          return;
      }
      log.debug("All parameters are validated");
      const that = this;
      this.context.auth.authorize(req.headers.access_token).then(function (response) {
          if (response.status == 401) {
              res.status(401).send("Authorization Failed!");
              return;
          }
          delete req.headers.access_token;
          that.context.chain.query_task(req).then(function(response) {
              res.json(response.body);
          });
      }).catch(function (error) {
          log.error(error);
          res.status(500).send(error.message);
      });
  }
  register() {
    this.router.get('/', (req, res) => this.query(req, res));
    return super.register();
  }
}

module.exports = TasksResource;