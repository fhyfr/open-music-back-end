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

      const pictureUrl = await this.service.uploadFile(data, data.hapi);

      const response = h.response({
        status: 'success',
        message: 'Gambar berhasil diunggah',
        data: {
          pictureUrl,
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
