const UserError = require('./UserError');

class InvariantError extends UserError {
  constructor(message) {
    super(message);
    this.name = 'InvariantError';
  }
}

module.exports = InvariantError;
