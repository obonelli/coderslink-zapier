// test/create_favorite.test.js
const nock = require('nock');
const zapier = require('zapier-platform-core');
const App = require('../index');

const appTester = zapier.createAppTester(App);
const BASE = 'https://api.thecatapi.com';

afterEach(() => nock.cleanAll());

describe('action:create_favorite', () => {
    it('posts favourite and returns SUCCESS (mocked)', async () => {
        const scope = nock(BASE)
            .post('/v1/favourites', (b) => b && b.image_id === 'img_123' && b.sub_id === 'zapier-sample')
            .reply(200, { message: 'SUCCESS', id: 98765 });

        const bundle = {
            authData: { api_key: 'fake' },
            inputData: { image_id: 'img_123', user_tag: 'zapier-sample' }
        };
        const out = await appTester(App.creates.create_favorite.operation.perform, bundle);

        expect(out).toEqual({ message: 'SUCCESS', id: 98765 });
        scope.done();
    });

    it('fails when image_id is missing (mocked)', async () => {
        const scope = nock(BASE).post('/v1/favourites').reply(400, { message: 'BAD_REQUEST' });

        const bundle = { authData: { api_key: 'fake' }, inputData: {} };
        await expect(appTester(App.creates.create_favorite.operation.perform, bundle)).rejects.toBeTruthy();
        scope.done();
    });

    it('LIVE (optional)', async () => {
        if (!process.env.THECAT_API_KEY || !process.env.ZP_TEST_LIVE || !process.env.THECAT_IMAGE_ID) return;
        const bundle = {
            authData: { api_key: process.env.THECAT_API_KEY },
            inputData: { image_id: process.env.THECAT_IMAGE_ID, user_tag: 'zapier-jest' }
        };
        const out = await appTester(App.creates.create_favorite.operation.perform, bundle);
        expect(out.message).toBe('SUCCESS');
        expect(typeof out.id).toBe('number');
    });
});
