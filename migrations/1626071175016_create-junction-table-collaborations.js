exports.up = (pgm) => {
  // create junction table collaborations
  pgm.createTable('collaborations', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'VARCHAR(50)',
    },
    user_id: {
      type: 'VARCHAR(50)',
    },
  });

  // add constraint foreign key to playlist_id
  pgm.addConstraint('collaborations', 'fk_playlists.playlist_id_playlists.id', 'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE');

  // add constraint foreign key to user_id
  pgm.addConstraint('collaborations', 'fk_users.user_id_users.id', 'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  // drop junction table collaborations
  pgm.dropTable('collaborations');

  // drop constraint playlist_id
  pgm.dropConstraint('playlists', 'fk_playlists.playlist_id_playlists.id');

  // drop constraint user_id
  pgm.dropConstraint('playlists', 'fk_users.user_id_users.id');
};
