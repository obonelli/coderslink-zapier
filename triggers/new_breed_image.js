// triggers/new_breed_image.js
const { withAuthHeaders } = require('../lib/request');

const perform = async (z, bundle) => {
    const opts = withAuthHeaders(z, bundle, {
        url: 'https://api.thecatapi.com/v1/images/search',
        params: {
            limit: 5,
            size: 'small',
            order: 'DESC',
            breed_ids: bundle.inputData.breed_id,
        },
    });

    const resp = await z.request(opts);
    const data = resp.json || [];
    const nowISO = new Date().toISOString();

    return data.map((img) => ({
        id: String(img.id),
        url: img.url,
        width: Number(img.width ?? 0),
        height: Number(img.height ?? 0),
        breed_id: bundle.inputData.breed_id,
        fetched_at: nowISO,
    }));
};

module.exports = {
    key: 'new_breed_image',
    noun: 'Breed Image',
    display: {
        label: 'New Breed Image',
        description: 'Triggers when a new image of a specific breed is available.',
    },
    operation: {
        type: 'polling',
        inputFields: [
            {
                key: 'breed_id',
                label: 'Breed ID',
                type: 'string',
                required: true,
                dynamic: 'list_breeds.id.name',
                helpText: 'Enter the CatAPI breed ID (e.g., "beng" for Bengal, "siam" for Siamese).',
            },
        ],
        perform,
        sample: {
            id: 'xyz123',
            url: 'https://cdn2.thecatapi.com/images/xyz123.jpg',
            width: 1024,
            height: 768,
            breed_id: 'beng',
            fetched_at: '2025-09-17T06:12:34.000Z',
        },
        outputFields: [
            { key: 'id', label: 'ID', type: 'string' },
            { key: 'url', label: 'Image URL', type: 'string' },
            { key: 'width', label: 'Width', type: 'integer' },
            { key: 'height', label: 'Height', type: 'integer' },
            { key: 'breed_id', label: 'Breed ID', type: 'string' },
            { key: 'fetched_at', label: 'Fetched At', type: 'datetime' },
        ],
    },
};
