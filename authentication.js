// authentication.js
// Custom Auth with API Key for TheCatAPI (without exposing the key)

const authentication = {
    type: 'custom',

    // Test now sends the header with the API Key
    test: (z, bundle) =>
        z
            .request({
                url: 'https://api.thecatapi.com/v1/images/search',
                headers: {
                    'x-api-key': bundle.authData.api_key,
                    accept: 'application/json',
                },
                params: { limit: 1 },
            })
            .then((res) => res.json),

    fields: [
        {
            key: 'api_key',
            label: 'API Key',
            type: 'string',
            required: true,
            helpText: 'Get a free key at https://thecatapi.com/ (Dashboard → API Keys).',
        },
    ],

    // connectionLabel with a variable (avoids D003) and without exposing the full key
    connectionLabel: (z, bundle) => {
        const key = bundle.authData?.api_key || '';
        const tail = key.slice(-4);
        return `TheCatAPI (key •••${tail})`;
    },
};

module.exports = authentication;
