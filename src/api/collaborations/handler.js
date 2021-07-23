const errorHandler = require('../../exceptions/ErrorHandler');

class CollaborationsHandler {
  constructor(collaborationsService, playlistsService, validator) {
    this.collaborationsService = collaborationsService;
    this.playlistsService = playlistsService;
    this.validator = validator;

    this.postCollaborationHandler = this.postCollaborationHandler.bind(this);
    this.deleteCollaborationHandler = this.deleteCollaborationHandler.bind(this);
  }

  async postCollaborationHandler(request, h) {
    try {
      this.validator.validateCollaborationsPayload(request.payload);

      const { id: owner } = request.auth.credentials;
      const { playlistId, userId } = request.payload;

      await this.playlistsService.verifyPlaylistOwner(playlistId, owner);

      const collaborationId = await this.collaborationsService.addCollaboration(playlistId, userId);
      const response = h.response({
        status: 'success',
        message: 'Kolaborasi berhasil ditambahkan',
        data: {
          collaborationId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      return errorHandler(error, h);
    }
  }

  async deleteCollaborationHandler(request, h) {
    try {
      this.validator.validateCollaborationsPayload(request.payload);

      const { id: owner } = request.auth.credentials;
      const { playlistId, userId } = request.payload;

      await this.playlistsService.verifyPlaylistOwner(playlistId, owner);
      await this.collaborationsService.deleteCollaboration(playlistId, userId);

      return {
        status: 'success',
        message: 'Kolaborasi berhasil dihapus',
      };
    } catch (error) {
      return errorHandler(error, h);
    }
  }
}

module.exports = CollaborationsHandler;
