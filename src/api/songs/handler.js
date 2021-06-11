const UserError = require('../../exceptions/UserError');

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postSongHandler = this.postSongHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }

  async postSongHandler(request, h) {
    try {
      this._validator.validateSongPayload(request.payload);
      const { title, year, performer, genre, duration } = request.payload;

      const songId = await this._service.addSong({ title, year, performer, genre, duration });

      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan',
        data: {
          songId,
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
}

module.exports = SongsHandler;