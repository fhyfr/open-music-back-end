const errorHandler = require('../../exceptions/ErrorHandler');

class PlaylistsHandler {
  constructor(playlistsService, validator) {
    this._playlistsService = playlistsService;
    this._validator = validator;

    this.postPlaylistHandler = this.postPlaylistHandler.bind(this);
  }

  async postPlaylistHandler(request, h) {
    try {
      this._validator.validatePlaylistPayload(request.payload);

      const { name } = request.payload;
      const { id: owner } = request.auth.credentials;

      const playlistId = await this._playlistsService.addPlaylist(name, owner);

      const response = h.response({
        status: 'success',
        message: 'Playlist berhasil ditambahkan',
        data: {
          playlistId,
        },
      });
      response.code(201);
      return response;

    } catch (error) {
      return errorHandler(error, h);
    }
  }

  async getPlaylistsHandler(request, h) {
    try {
      const { id: owner } = request.auth.credentials;
      const playlists = await this._playlistsService.getPlaylists(owner);

      return {
        status: 'success',
        data: {
          playlists,
        },
      };
    } catch (error) {
      return errorHandler(error, h);
    }
  }
}

module.exports = PlaylistsHandler;