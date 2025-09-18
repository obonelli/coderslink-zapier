// creates/add_vote.js
const { withAuthHeaders } = require('../lib/request');

const perform = async (z, bundle) => {
    const body = {
        image_id: bundle.inputData.image_id,
        value: Number(bundle.inputData.value), // 1 = upvote, 0 = downvote
    };

    /// optional: user tag -> sub_id in TheCatAPI
    if (bundle.inputData.user_tag) body.sub_id = bundle.inputData.user_tag;

    const opts = withAuthHeaders(z, bundle, {
        url: 'https://api.thecatapi.com/v1/votes',
        method: 'POST',
        body
    });

    const resp = await z.request(opts);
    const json = resp.json || {}; // typically { message: 'SUCCESS', id: <number> }

    return {
        id: json.id,
        message: json.message,
        image_id: body.image_id,
        value: body.value,
        sub_id: body.sub_id || null
    };
};

module.exports = {
    key: 'add_vote',
    noun: 'Vote',
    display: {
        label: 'Add Vote',
        description: 'Submit a vote (like/dislike) for a cat image.'
    },
    operation: {
        inputFields: [
            {
                key: 'image_id',
                label: 'Image ID',
                type: 'string',
                required: true,
                helpText: 'Map the image ID from the trigger.',
                dynamic: 'new_image.id'
            },
            {
                key: 'value',
                label: 'Vote',
                type: 'integer',
                required: true,
                choices: { 1: 'Upvote (1)', 0: 'Downvote (0)' },
                helpText: 'Choose 1 for Upvote or 0 for Downvote.',
                altersDynamicFields: false
            },
            {
                key: 'user_tag',
                label: 'User Tag (optional)',
                required: false,
                helpText: 'Optional label stored as TheCatAPI sub_id for analytics.'
            }
        ],
        perform,
        sample: {
            id: 12345,
            message: 'SUCCESS',
            image_id: 'abc123',
            value: 1,
            sub_id: 'zapier-sample'
        },
        outputFields: [
            { key: 'id', label: 'Vote ID', type: 'integer' },
            { key: 'message', label: 'Message', type: 'string' },
            { key: 'image_id', label: 'Image ID', type: 'string' },
            { key: 'value', label: 'Vote Value', type: 'integer' },
            { key: 'sub_id', label: 'User Tag (sub_id)', type: 'string' }
        ]
    }
};
