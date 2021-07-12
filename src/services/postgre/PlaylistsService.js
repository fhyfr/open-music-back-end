const nanoid = require("nanoid");
const { Pool } = require("pg");
const ForbiddenError = require("../../exceptions/ForbiddenError");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylist(name, owner) {
    const id = `playlist-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO playlists VALUES($1, $2, $3) RETURNING id',
      values: [id, name, owner],
    };

    const result = await this._pool.query(query);

    if(!result.rows.length) {
      throw new InvariantError('Playlist gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getPlaylists(owner) {
    const query = {
      text: 'SELECT playlists.id, playlists.name, users.username FROM playlists INNER JOIN users ON playlists.owner = users.id WHERE playlists.owner = $1',
      values: [owner],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async deletePlaylists(playlistId, owner) {
    // check if playlist exist
    await this.checkPlaylist(playlistId);

    // verify playlist owner
    await this.verifyPlaylistOwner(playlistId, owner);

    const query = {
      text: 'DELETE FROM playlists WHERE id=$1 AND owner=$2',
      values: [playlistId, owner],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Playlist gagal dihapus');
    }
  }

  async addSongToPlaylist({playlistId, owner, songId  }) {
    // check playlist if exist
    await this.checkPlaylist(playlistId);

    // verify playlist owner
    await this.verifyPlaylistOwner(playlistId, owner);
    
    const id = `playlistsongs-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO playlistsongs VALUES( $1, $2, $3) RETURNING id',
      values: [id, playlistId, songId],
    };
    const result = await this._pool.query(query);

    if(!result.rows.length) {
      throw InvariantError('Gagal menambahkan lagu ke playlist');
    }

    return result.rows[0].id;
  }

  async getSongsFromPlaylist(playlistId, owner) {
    // check playlist if exist
    await this.checkPlaylist(playlistId);

    // verify playlist owner
    await this.verifyPlaylistOwner(playlistId, owner);

    const query = {
      text: 'SELECT songs.id, songs.title, songs.performer FROM songs INNER JOIN playlistsongs ON songs.id = playlistsongs.song_id WHERE playlist_id=$1',
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async verifyPlaylistOwner(playlistId, owner) {
    const query = {
      text: 'SELECT * FROM playlists WHERE id=$1 AND owner=$2',
      values: [playlistId, owner],
    };

    const result = await this._pool.query(query);

    if(!result.rows.length) {
      throw new ForbiddenError('Anda tidak berhak mengakses playlist tersebut');
    }
  }

  async checkPlaylist(playlistId) {
    const query = {
      text: 'SELECT * FROM playlists WHERE id=$1',
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    if(!result.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan')
    }
  }
}

module.exports = PlaylistsService;