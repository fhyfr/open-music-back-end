const ExportsSongsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'exportSongs',
  version: '1.0.0',
  register: async (server, {
    service,
    playlistService,
    validator,
  }) => {
    const exportsSongsHandler = new ExportsSongsHandler(
      service,
      playlistService,
      validator,
    );

    server.route(routes(exportsSongsHandler));
  },
};
