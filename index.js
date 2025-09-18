// index.js (CommonJS)
const { version } = require('./package.json');
const { version: platformVersion } = require('zapier-platform-core');

const authentication = require('./authentication');

// Records
const NewImageTrigger = require('./triggers/new_image');
const NewBreedImageTrigger = require('./triggers/new_breed_image');
const CreateFavorite = require('./creates/create_favorite');
const AddVote = require('./creates/add_vote');

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
    [NewBreedImageTrigger.key]: NewBreedImageTrigger,
  },

  // SEARCHES
  searches: {},

  // ACTIONS (CREATES)
  creates: {
    [CreateFavorite.key]: CreateFavorite,
    [AddVote.key]: AddVote,
  },
};
