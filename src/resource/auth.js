const BaseResource = require('./base-resource');
const log = require('./../logging/log');
const _ = require('lodash');

class AuthResource extends BaseResource {

  auth(req, res) {

      log.debug("Auth endpoint is being called");
      req.checkBody('secret', 'secret is required!').notEmpty();
      const errors = req.validationErrors();
      if (errors) {
          res.status(403).send(_.map(errors, err => { return err.msg; }));
          return;
      }
      log.debug("Params are validated");

      this.context.auth.authenticate(req.body.secret).then(function (response) {
          if (response.status == 401) {
              res.status(401).send("Authentication Failed!");
              return;
          }
          res.json({
              access_token: response.access_token
          });
      }).catch(function (error) {
          log.error(error);
          res.status(500).send(error.message);
      });
  }
  register() {
      this.router.post('/', (req, res) => this.auth(req, res));
      return super.register();
  }
}

module.exports = AuthResource;