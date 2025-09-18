// test/auth.test.js
const nock = require('nock');
const zapier = require('zapier-platform-core');
const App = require('../index');

const appTester = zapier.createAppTester(App);
const BASE = 'https://api.thecatapi.com';

afterEach(() => nock.cleanAll());

describe('authentication test', () => {
    it('calls /v1/images/search with x-api-key (mocked)', async () => {
        const scope = nock(BASE, {
            reqheaders: { 'x-api-key': 'fake-key-123' }
        })
            .get('/v1/images/search')
            .reply(200, [{ id: 'abc', url: 'https://cdn2.thecatapi.com/images/abc.jpg' }]);

        const bundle = { authData: { api_key: 'fake-key-123' } };
        const out = await appTester(App.authentication.test, bundle);

        expect(Array.isArray(out)).toBe(true);
        expect(out[0].id).toBe('abc');
        scope.done();
    });

    // Opt-in LIVE (exporta THECAT_API_KEY y ZP_TEST_LIVE=1 para correrlo)
    it('LIVE (optional)', async () => {
        if (!process.env.THECAT_API_KEY || !process.env.ZP_TEST_LIVE) return;
        const bundle = { authData: { api_key: process.env.THECAT_API_KEY } };
        const out = await appTester(App.authentication.test, bundle);
        expect(Array.isArray(out)).toBe(true);
        expect(out.length).toBeGreaterThan(0);
    });
});
