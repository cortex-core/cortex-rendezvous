const BaseResource = require('base-resource.js');

class Resources {
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
    this.register.get('/example', this.example);
    return super.register();
  }
}

module.exports = ExampleResource;