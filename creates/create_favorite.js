// creates/create_favorite.js
const { withAuthHeaders } = require('../lib/request');

const perform = async (z, bundle) => {
    const body = {
        image_id: bundle.inputData.image_id,
        // Map user_tag -> sub_id (TheCatAPI)
        sub_id: bundle.inputData.user_tag || 'zapier-sample'
    };

    const opts = withAuthHeaders(z, bundle, {
        url: 'https://api.thecatapi.com/v1/favourites',
        method: 'POST',
        body
    });

    const resp = await z.request(opts);
    return resp.json; // { message: 'SUCCESS', id: <number> }
};

module.exports = {
    key: 'create_favorite',
    noun: 'Favorite',
    display: {
        label: 'Create Favorite',
        description: 'Marks an image as favorite in TheCatAPI.'
    },
    operation: {
        inputFields: [
            {
                key: 'image_id',
                label: 'Image ID',
                required: true,
                helpText: 'Pick an ID from the trigger or type one.',
                dynamic: 'new_image.id' // dynamic dropdown -> remove D004 in image_id
            },
            {
                key: 'user_tag',
                label: 'User Tag (optional)',
                required: false,
                helpText: 'Optional label stored as TheCatAPI sub_id.'
            }
        ],
        perform,
        sample: { message: 'SUCCESS', id: 99999 },
        outputFields: [
            { key: 'id', label: 'Favorite ID', type: 'integer' },
            { key: 'message', label: 'Message', type: 'string' }
        ]
    }
};
