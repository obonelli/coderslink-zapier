const nock = require('nock');
const zapier = require('zapier-platform-core');
const app = require('../index');

const appTester = zapier.createAppTester(app);
const perform = app.triggers.new_image.operation.perform;

describe('new_image datetime format', () => {
    beforeAll(() => nock.disableNetConnect());
    afterEach(() => nock.cleanAll());
    afterAll(() => nock.enableNetConnect());

    test('returns fetched_at in ISO-8601 (with Z)', async () => {
        // Minimal mock: don't tie to all query params to avoid fragility
        nock('https://api.thecatapi.com')
            .get('/v1/images/search')
            .query(true) // accept any query (?limit=10&size=small&order=DESC)
            .reply(200, [
                { id: 'abc123', url: 'https://cdn2.thecatapi.com/images/abc123.jpg', width: 800, height: 600 },
            ]);

        const bundle = { authData: { api_key: 'fake-key' } };
        const results = await appTester(perform, bundle);

        expect(results.length).toBeGreaterThan(0);
        const item = results[0];

        // Simple ISO-8601 with Z suffix (UTC). Example: 2025-09-17T06:12:34.000Z
        const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

        expect(item).toHaveProperty('fetched_at');
        expect(typeof item.fetched_at).toBe('string');
        expect(isoRegex.test(item.fetched_at)).toBe(true);
    });
});
