const UserError = require("./UserError");

class NotFoundError extends UserError {
  constructor(message) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;