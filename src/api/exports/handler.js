const errorHandler = require('../../exceptions/ErrorHandler');

class ExportsSongsHandler {
  constructor(service, playlistService, validator) {
    this.service = service;
    this.playlistService = playlistService;
    this.validator = validator;

    this.postExportPlaylistsByIdHandler = this.postExportPlaylistsByIdHandler.bind(this);
  }

  async postExportPlaylistsByIdHandler(request, h) {
    try {
      this.validator.validateExportSongsFromPlaylistPayload(request.payload);

      const { id: owner } = request.auth.credentials;
      const message = {
        playlistId: request.params.playlistId,
        targetEmail: request.payload.targetEmail,
      };

      await this.playlistService.verifyPlaylistAccess(message.playlistId, owner);
      await this.service.sendMessage('export:songs', JSON.stringify(message));

      const response = h.response({
        status: 'success',
        message: 'Permintaan Anda sedang kami proses',
      });

      response.code(201);
      return response;
    } catch (error) {
      return errorHandler(error, h);
    }
  }
}

module.exports = ExportsSongsHandler;
