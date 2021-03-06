exports.up = (pgm) => {
  // add constraint foreign key to owner
  pgm.addConstraint('playlists', 'fk_playlists.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  // drop constraint foreign key from owner
  pgm.dropConstraint('playlists', 'fk_playlists.owner_users.id');
};
