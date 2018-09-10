const BaseResource = require('./base-resource');

class ExampleResource extends BaseResource {
  constructor(express) {
    super(express);
    this.test = 'test';
  }
  set name(name) {
    this.test = name.toUpperCase();
  }
  get name() {
    return this.test;
  }
  example(req, res) {
    res.send('fuck');
  }
  register() {
    this.router.get('/', this.example);
    return super.register();
  }
}

module.exports = ExampleResource;
