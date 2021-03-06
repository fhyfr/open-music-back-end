const UserError = require('./UserError');

// bundle error handLer
const errorHandler = (error, h) => {
  if (error instanceof UserError) {
    const response = h.response({
      status: 'fail',
      message: error.message,
    });
    response.code(error.statusCode);
    return response;
  }

  // server error
  const response = h.response({
    status: 'error',
    message: 'Mohon maaf, terjadi kegagalan pada server kami.',
  });
  response.code(500);
  return response;
};

module.exports = errorHandler;
