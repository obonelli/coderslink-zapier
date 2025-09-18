// index.js (CommonJS entrypoint for the Zapier app)
const { version } = require('./package.json');
const { version: platformVersion } = require('zapier-platform-core');

// Authentication definition
const authentication = require('./authentication');

// Triggers
const NewImageTrigger = require('./triggers/new_image');
const NewBreedImageTrigger = require('./triggers/new_breed_image');
// Hidden trigger for dynamic dropdown (list of breeds)
const ListBreeds = require('./triggers/list_breeds');

// Creates (actions)
const CreateFavorite = require('./creates/create_favorite');
const AddVote = require('./creates/add_vote');

module.exports = {
  version,
  platformVersion,
  authentication,

  // Global hooks (optional middleware)
  beforeRequest: [],
  afterResponse: [],

  resources: {},

  // TRIGGERS
  triggers: {
    [NewImageTrigger.key]: NewImageTrigger,
    [NewBreedImageTrigger.key]: NewBreedImageTrigger,
    [ListBreeds.key]: ListBreeds, // hidden trigger used only for dynamic dropdown
  },

  // SEARCHES
  searches: {},

  // ACTIONS (CREATES)
  creates: {
    [CreateFavorite.key]: CreateFavorite,
    [AddVote.key]: AddVote,
  },
};
