const UserError = require("./UserError");

class AuthenticationsError extends UserError {
  constructor(message) {
    super(message, 401);
    this.name = 'AthenticationsError';
  }
}

module.exports = AuthenticationsError;