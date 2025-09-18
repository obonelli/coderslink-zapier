// triggers/list_breeds.js
// Hidden trigger used only to populate a dynamic dropdown for breed selection

const { withAuthHeaders } = require('../lib/request');

const perform = async (z, bundle) => {
    // Call TheCatAPI to fetch all available breeds
    const opts = withAuthHeaders(z, bundle, {
        url: 'https://api.thecatapi.com/v1/breeds',
        method: 'GET',
    });

    const resp = await z.request(opts);
    const data = resp.json || [];

    // Zapier expects objects with { id, name } for dropdowns
    return data.map((breed) => ({
        id: breed.id,
        name: breed.name,
    }));
};

module.exports = {
    key: 'list_breeds',
    noun: 'Breed',
    display: {
        hidden: true, // hidden so it won't show up as a selectable trigger
        label: 'List Breeds',
        description: 'Fetches all breeds from TheCatAPI (used for dynamic dropdowns).',
    },
    operation: {
        perform,
        sample: { id: 'beng', name: 'Bengal' }, // minimal example for Zapier schema
        outputFields: [
            { key: 'id', label: 'Breed ID' },
            { key: 'name', label: 'Breed Name' },
        ],
    },
};
