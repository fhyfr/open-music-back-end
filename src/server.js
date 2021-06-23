// DOTE ENV
require("dotenv").config();
const Hapi = require('@hapi/hapi');

// users
const users = require("./api/users");
const UsersService = require("./services/postgre/UsersService");
const UsersValidator = require("./validator/users");

// songs
const songs = require('./api/songs');
const SongsService = require('./services/postgre/SongsService');
const SongsValidator = require('./validator/songs');

const init = async () => {
  const songsService = new SongsService();
  const usersService = new UsersService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: songs,
      options: {
        service: songsService,
        validator: SongsValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();