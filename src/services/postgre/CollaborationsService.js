const nanoid = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');

class CollaborationsService {
  constructor() {
    this.pool = new Pool();
  }

  async addCollaboration(playlistId, userId) {
    const id = `collab-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO collaborations VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, userId],
    };

    const result = await this.pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Gagal menambahkan kolaborasi');
    }

    return result.rows[0].id;
  }

  async deleteCollaboration(playlistId, userId) {
    const query = {
      text: 'DELETE FROM collaborations WHERE playlist_id=$1 AND user_id=$2',
      values: [playlistId, userId],
    };

    const result = await this.pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Gagal menghapus kolaborasi');
    }
  }

  async verifyCollaborator(playlistId, userId) {
    const query = {
      text: 'SELECT * FROM collaborations WHERE playlist_id=$1 AND user_id=$2',
      values: [playlistId, userId],
    };

    const result = await this.pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Kolaborasi gagal diverifikasi');
    }
  }
}

module.exports = CollaborationsService;