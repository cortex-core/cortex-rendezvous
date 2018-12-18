const BaseResource = require('./base-resource');
const Auth = require('./../auth/auth.js');
const log = require('./../logging/log');
const _ = require('lodash');

class TasksResource extends BaseResource {

  constructor(blockchain) {
    super();
    this.blockchain = blockchain;
    this.auth = new Auth();
  }
  submit(req, res) {

      log.debug("Task Submission method is being called");
      req.checkBody('access_token', 'access_token is required!').notEmpty();
      req.checkBody('task', 'task is required!').notEmpty();
      const errors = req.validationErrors();
      if (errors) {
          res.status(403).send(_.map(errors, err => { return err.msg; }));
          return;
      }
      log.debug("Params are validated");
      const that = this;
      this.auth.authorize(req.body.access_token).then(function (response) {
          if (response.status == 401) {
              res.status(401).send("Authorization Failed!");
              return;
          }
          const { tracking_number, reward_per_task } = that.blockchain.put(req.body.task);
          res.json({
              tracking_number: tracking_number,
              reward_per_task: reward_per_task
          });
      }).catch(function (error) {
          log.error(error);
          res.status(500).send(error.message);
      });
  }
  register() {
    this.router.post('/submit', (req, res) => this.submit(req, res));
    return super.register();
  }
}

module.exports = TasksResource;