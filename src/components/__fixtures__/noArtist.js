import config from '../../config';

const noArtist = {
  data: {
    results: {
      'opensearch:Query': {
        '#text': '', role: 'request', searchTerms: '$', startPage: '1',
      },
      'opensearch:totalResults': '0',
      'opensearch:startIndex': '0',
      'opensearch:itemsPerPage': '30',
      artistmatches: { artist: [] },
      '@attr': { for: '$' },
    },
  },
  status: 200,
  statusText: 'OK',
  headers: { 'content-length': '235', 'content-type': 'application/json' },
  config: {
    url: 'https://ws.audioscrobbler.com/2.0/',
    method: 'get',
    params: {
      method: 'artist.search', api_key: config.KEY, artist: '$', format: 'json',
    },
    headers: { Accept: 'application/json, text/plain, */*' },
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
  },
  request: {},
};

export default noArtist;
