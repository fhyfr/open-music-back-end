const errorHandler = require('../../exceptions/ErrorHandler');

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
      return errorHandler(error, h);
    }
  }
}

module.exports = UsersHandler;