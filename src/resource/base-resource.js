const express = require('express');

class BaseResource {
  constructor() {
    this.router = express.Router();
  }
  register() {
    return this.router;
  }
}

module.exports = BaseResource;
