const errorHandler = require('../../exceptions/ErrorHandler');

class UploadPicturesHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    this.postUploadPicturesHandler = this.postUploadPicturesHandler.bind(this);
  }

  async postUploadPicturesHandler(request, h) {
    try {
      const { data } = request.payload;

      this.validator.validatePictureHeaders(data.hapi.headers);

      const fileName = await this.service.uploadFile(data, data.hapi);

      const response = h.response({
        status: 'success',
        message: 'Gambar berhasil diunggah',
        data: {
          pictureUrl: `http://${process.env.HOST}:${process.env.PORT}/upload/images/${fileName}`,
        },
      });

      response.code(201);
      return response;
    } catch (error) {
      return errorHandler(error, h);
    }
  }
}

module.exports = UploadPicturesHandler;
