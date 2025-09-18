// test/new_image.test.js
const nock = require('nock');
const zapier = require('zapier-platform-core');
const App = require('../index');

const appTester = zapier.createAppTester(App);
const BASE = 'https://api.thecatapi.com';

afterEach(() => nock.cleanAll());

describe('trigger:new_image', () => {
    it('maps items with correct types (mocked)', async () => {
        const sample = [
            { id: 'XYZ123', url: 'https://cdn2.thecatapi.com/images/xyz.jpg', width: 640, height: 480 },
            { id: 'ABC999', url: 'https://cdn2.thecatapi.com/images/abc.jpg', width: 800, height: 600 }
        ];
        const scope = nock(BASE).get('/v1/images/search').query(true).reply(200, sample);

        const bundle = { authData: { api_key: 'fake' } };
        const out = await appTester(App.triggers.new_image.operation.perform, bundle);

        expect(Array.isArray(out)).toBe(true);
        expect(out.length).toBe(2);
        const first = out[0];
        expect(typeof first.id).toBe('string');
        expect(typeof first.url).toBe('string');
        expect(typeof first.width).toBe('number');
        expect(typeof first.height).toBe('number');
        scope.done();
    });

    it('LIVE (optional)', async () => {
        if (!process.env.THECAT_API_KEY || !process.env.ZP_TEST_LIVE) return;
        const bundle = { authData: { api_key: process.env.THECAT_API_KEY } };
        const out = await appTester(App.triggers.new_image.operation.perform, bundle);
        expect(Array.isArray(out)).toBe(true);
        expect(out.length).toBeGreaterThan(0);
    });
});
