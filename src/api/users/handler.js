const UserError = require('../../exceptions/UserError');

class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler(request, h) {
    try {
      await this._validator.validateUserPayload(request.payload);
      
      const userId = await this._service.addUser(request.payload);

      const response = h.response({
        status: 'success',
        message: 'User berhasil ditambahkan',
        data: {
          userId,
        },
      });

      response.code(201);
      return response;
    } catch (error) {
      if(error instanceof UserError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        console.error(error);
        response.code(error.statusCode);
        return response;
      }

      // server error
      const response = h.response({
        status: 'error',
        message: 'Server error, coba lagi beberapa saat.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = UsersHandler;