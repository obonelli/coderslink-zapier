// index.js (CommonJS)
const { version } = require('./package.json');
const { version: platformVersion } = require('zapier-platform-core');

const authentication = require('./authentication');

// Records
const NewImageTrigger = require('./triggers/new_image');
const CreateFavorite = require('./creates/create_favorite');

module.exports = {
  version,
  platformVersion,
  authentication,

  // Global hooks
  beforeRequest: [],
  afterResponse: [],

  resources: {},

  // TRIGGERS
  triggers: {
    [NewImageTrigger.key]: NewImageTrigger,
  },

  // SEARCHES
  searches: {},

  // ACTIONS
  creates: {
    [CreateFavorite.key]: CreateFavorite,
  },
};
