const nock = require('nock');
const zapier = require('zapier-platform-core');
const app = require('../index');

const appTester = zapier.createAppTester(app);
const perform = app.triggers.new_breed_image.operation.perform;

describe('new_breed_image trigger', () => {
    beforeAll(() => nock.disableNetConnect());
    afterEach(() => nock.cleanAll());
    afterAll(() => nock.enableNetConnect());

    test('returns images for a given breed and includes ISO datetime', async () => {
        // Minimal/robust mock: only assert breed_ids is present and correct.
        nock('https://api.thecatapi.com')
            .get('/v1/images/search')
            .query((q) => q && q.breed_ids === 'beng') // don't over-constrain other params
            .reply(200, [
                { id: 'img001', url: 'https://cdn2.thecatapi.com/images/img001.jpg', width: 1200, height: 800 },
                { id: 'img002', url: 'https://cdn2.thecatapi.com/images/img002.jpg', width: 1024, height: 768 },
            ]);

        const bundle = {
            authData: { api_key: 'fake-key' },
            inputData: { breed_id: 'beng' },
        };

        const results = await appTester(perform, bundle);

        expect(Array.isArray(results)).toBe(true);
        expect(results.length).toBeGreaterThan(0);

        const item = results[0];
        expect(item).toHaveProperty('id', 'img001');
        expect(item).toHaveProperty('url');
        expect(item).toHaveProperty('width');
        expect(item).toHaveProperty('height');
        expect(item).toHaveProperty('breed_id', 'beng');

        // Simple ISO-8601 with Z (UTC), e.g. 2025-09-17T06:12:34.000Z
        const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
        expect(typeof item.fetched_at).toBe('string');
        expect(isoRegex.test(item.fetched_at)).toBe(true);
    });
});
