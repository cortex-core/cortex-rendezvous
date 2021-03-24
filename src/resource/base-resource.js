const express = require('express');

class BaseResource {
  constructor(context) {
    this.context = context;
    this.router = express.Router();
  }
  register() {
    return this.router;
  }
}

module.exports = BaseResource;
