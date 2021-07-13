const errorHandler = require('../../exceptions/ErrorHandler');

class PlaylistsHandler {
  constructor(playlistsService, validator) {
    this.playlistsService = playlistsService;
    this.validator = validator;

    this.postPlaylistHandler = this.postPlaylistHandler.bind(this);
    this.getPlaylistsHandler = this.getPlaylistsHandler.bind(this);
    this.deletePlaylistHandler = this.deletePlaylistHandler.bind(this);
    this.postSongToPlaylistHandler = this.postSongToPlaylistHandler.bind(this);
    this.getSongsFromPlaylistHandler = this.getSongsFromPlaylistHandler.bind(this);
    this.deleteSongFromPlaylistHandler = this.deleteSongFromPlaylistHandler.bind(this);
  }

  async postPlaylistHandler(request, h) {
    try {
      this.validator.validatePlaylistPayload(request.payload);

      const { name } = request.payload;
      const { id: owner } = request.auth.credentials;

      const playlistId = await this.playlistsService.addPlaylist(name, owner);

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
      const playlists = await this.playlistsService.getPlaylists(owner);

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

  async deletePlaylistHandler(request, h) {
    try {
      const { id: owner } = request.auth.credentials;
      const { playlistId } = request.params;

      await this.playlistsService.deletePlaylists(playlistId, owner);

      return {
        status: 'success',
        message: 'Playlist berhasil dihapus',
      };
    } catch (error) {
      return errorHandler(error, h);
    }
  }

  async postSongToPlaylistHandler(request, h) {
    try {
      this.validator.validateSongToPlaylistPayload(request.payload);

      const { playlistId } = request.params;
      const { id: owner } = request.auth.credentials;
      const { songId } = request.payload;

      await this.playlistsService.verifyPlaylistAccess(playlistId, owner);
      await this.playlistsService.addSongToPlaylist(playlistId, songId);

      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan ke playlist',
      });

      response.code(201);
      return response;
    } catch (error) {
      return errorHandler(error, h);
    }
  }

  async getSongsFromPlaylistHandler(request, h) {
    try {
      const { id: owner } = request.auth.credentials;
      const { playlistId } = request.params;

      await this.playlistsService.verifyPlaylistAccess(playlistId, owner);
      const songs = await this.playlistsService.getSongsFromPlaylist(playlistId);

      return {
        status: 'success',
        data: {
          songs,
        },
      };
    } catch (error) {
      return errorHandler(error, h);
    }
  }

  async deleteSongFromPlaylistHandler(request, h) {
    try {
      this.validator.validateSongToPlaylistPayload(request.payload);

      const { id: owner } = request.auth.credentials;
      const { playlistId } = request.params;
      const { songId } = request.payload;

      await this.playlistsService.verifyPlaylistAccess(playlistId, owner);
      await this.playlistsService.deleteSongsFromPlaylist(playlistId, songId);

      return {
        status: 'success',
        message: 'Lagu berhasil dihapus dari playlist',
      };
    } catch (error) {
      return errorHandler(error, h);
    }
  }
}

module.exports = PlaylistsHandler;
