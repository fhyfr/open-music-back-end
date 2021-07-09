const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists',
    handler: handler.postPlaylistHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  // {
  //   method: 'GET',
  //   path: '/playlists',
  //   handler: handler.getPlaylistsHandler,
  // },
  // {
  //   method: 'DELETE',
  //   path: '/playlists/{playlistId}',
  //   handler: handler.deletePlaylistHandler,
  // },
  // {
  //   method: 'POST',
  //   path: '/playlists/{playlistId}/songs',
  //   handler: handler.postSongToPlaylistHandler,
  // },
  // {
  //   method: 'GET',
  //   path: '/playlists/{playlistId}/songs',
  //   handler: handler.getSongsOnPlaylistHandler,
  // },
  // {
  //   method: 'DELETE',
  //   path: '/playlists/{playlistId}/songs',
  //   handler: handler.deleteSongFromPlaylistHandler,
  // },
]

module.exports = routes;