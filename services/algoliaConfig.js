const algoliasearch = require('algoliasearch');

const ALGOLIA_APP_ID = 'JUIX37JGYV';
const ALGOLIA_API_KEY = '5c3c8bdb4ff9e4fc1367d6047a3e930f';
const ALGOLIA_INDEX_NAME = 'eventos';

const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
const index = searchClient.initIndex(ALGOLIA_INDEX_NAME);

module.exports = index;
