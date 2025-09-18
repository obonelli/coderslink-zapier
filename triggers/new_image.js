// triggers/new_image.js
const { withAuthHeaders } = require('../lib/request');

const perform = async (z, bundle) => {
    const opts = withAuthHeaders(z, bundle, {
        url: 'https://api.thecatapi.com/v1/images/search',
        params: { limit: 10, size: 'small', order: 'DESC' },
    });

    const resp = await z.request(opts);
    const data = resp.json || [];
    const nowISO = new Date().toISOString();

    return data.map((img) => ({
        id: String(img.id),
        url: img.url,
        width: Number(img.width ?? 0),
        height: Number(img.height ?? 0),
        // Datetime field to comply with T003 (ISO 8601)
        fetched_at: nowISO,
    }));
};

module.exports = {
    key: 'new_image',
    noun: 'Image',
    display: {
        label: 'New Image',
        description: 'Triggers when a new image is available (TheCatAPI).',
    },
    operation: {
        type: 'polling',
        perform,
        sample: {
            id: 'abc123',
            url: 'https://cdn2.thecatapi.com/images/abc123.jpg',
            width: 800,
            height: 600,
            fetched_at: '2025-09-17T06:12:34.000Z',
        },
        outputFields: [
            { key: 'id', label: 'ID', type: 'string' },
            { key: 'url', label: 'Image URL', type: 'string' },
            { key: 'width', label: 'Width', type: 'integer' },
            { key: 'height', label: 'Height', type: 'integer' },
            // Declared as datetime (ISO 8601)
            { key: 'fetched_at', label: 'Fetched At', type: 'datetime' },
        ],
    },
};
