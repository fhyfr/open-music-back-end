const UserError = require("./UserError");

class ForbiddenError extends UserError {
  constructor(message) {
    super(message, 403);
    this.name = 'ForbiddenError';
  }
}

module.exports = ForbiddenError;