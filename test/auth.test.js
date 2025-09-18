// test/auth.test.js
const nock = require('nock');
const zapier = require('zapier-platform-core');
const appRaw = require('../index');

// create the appTester with your app
const appTester = zapier.createAppTester(appRaw);

describe('authentication test', () => {
    beforeAll(() => {
        nock.disableNetConnect(); // prevent real HTTP calls
    });

    afterEach(() => {
        nock.cleanAll(); // clear interceptors between tests
    });

    afterAll(() => {
        nock.enableNetConnect();
    });

    test('calls /v1/images/search with x-api-key (mocked)', async () => {
        // mock the endpoint with query ?limit=1
        nock('https://api.thecatapi.com')
            .get('/v1/images/search')
            .query({ limit: '1' }) // note: as string
            .matchHeader('x-api-key', 'fake-key-123') // validate the header
            .reply(200, [{ id: 'abc123', url: 'https://cdn2.thecatapi.com/images/abc123.jpg' }]);

        const bundle = {
            authData: { api_key: 'fake-key-123' },
        };

        // run the test defined in authentication.js
        const result = await appTester(appRaw.authentication.test, bundle);

        expect(Array.isArray(result)).toBe(true);
        expect(result[0]).toHaveProperty('id', 'abc123');
    });
});
