const algoliasearch = require('algoliasearch');

const ALGOLIA_APP_ID = 'JUIX37JGYV';
const ALGOLIA_API_KEY = '367b1d2fcbb08cb101c34019bf40e57b';
const ALGOLIA_INDEX_NAME = 'eventos';

const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
const index = searchClient.initIndex(ALGOLIA_INDEX_NAME);

module.exports = index;
