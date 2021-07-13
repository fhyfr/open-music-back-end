exports.up = (pgm) => {
  // create junction table playlistsongs
  pgm.createTable('playlistsongs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'VARCHAR(50)',
    },
    song_id: {
      type: 'VARCHAR(50)',
    },
  });

  // add constraint foreign key to playlist_id
  pgm.addConstraint('playlistsongs', 'fk_playlists.playlist_id_playlists.id', 'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE');

  // add constraint foreign key to song_id
  pgm.addConstraint('playlistsongs', 'fk_songs.song_id_songs.id', 'FOREIGN KEY(song_id) REFERENCES songs(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  // drop junction table playlistsongs
  pgm.dropTable('playlistsongs');

  // drop constraint playlist_id
  pgm.dropConstraint('playlists', 'fk_playlists.playlist_id_playlists.id');

  // drop constraint song_id
  pgm.dropConstraint('playlists', 'fk_songs.song_id_songs.id');
};
