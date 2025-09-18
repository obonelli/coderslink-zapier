const perform = async (z, bundle) => {
    const resp = await z.request({
        url: 'https://api.thecatapi.com/v1/votes',
        method: 'POST',
        headers: {
            'x-api-key': bundle.authData.api_key,
            'Content-Type': 'application/json',
        },
        body: {
            image_id: bundle.inputData.image_id,
            value: bundle.inputData.value, // 1 = upvote, 0 = downvote
        },
    });

    return resp.json;
};

module.exports = {
    key: 'add_vote',
    noun: 'Vote',
    display: {
        label: 'Add Vote',
        description: 'Submit a vote (like/dislike) for a cat image.',
    },
    operation: {
        inputFields: [
            { key: 'image_id', label: 'Image ID', type: 'string', required: true },
            { key: 'value', label: 'Vote (1=Up, 0=Down)', type: 'integer', required: true },
        ],
        perform,
        sample: { id: 999, image_id: 'abc123', value: 1 },
        outputFields: [
            { key: 'id', label: 'Vote ID', type: 'integer' },
            { key: 'image_id', label: 'Image ID', type: 'string' },
            { key: 'value', label: 'Vote Value', type: 'integer' },
        ],
    },
};
