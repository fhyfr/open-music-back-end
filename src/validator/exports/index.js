const ExportSongsFromPlaylistSchema = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const ExportSongsValidator = {
  validateExportSongsFromPlaylistPayload: (payload) => {
    const validationResult = ExportSongsFromPlaylistSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = ExportSongsValidator;
