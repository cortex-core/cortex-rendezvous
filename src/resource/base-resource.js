class BaseResource {
  constructor(express) {
    this.router = express.Router();
  }
  register() {
    return this.router;
  }
}

module.exports = BaseResource;
