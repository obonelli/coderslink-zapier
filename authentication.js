// authentication.js
// Custom Auth con API Key para TheCatAPI (sin exponer la key)

const authentication = {
    type: 'custom',

    // Test ahora envía el header con la API Key
    test: (z, bundle) =>
        z
            .request({
                url: 'https://api.thecatapi.com/v1/images/search',
                headers: {
                    'x-api-key': bundle.authData.api_key,
                    'accept': 'application/json'
                }
            })
            .then((res) => res.json),

    fields: [
        {
            key: 'api_key',
            label: 'API Key',
            type: 'string',
            required: true,
            helpText: 'Get a free key at https://thecatapi.com/ (Dashboard → API Keys).'
        }
    ],

    // Label genérico (puede disparar D003 pero no afecta funcionalidad)
    connectionLabel: 'TheCatAPI Account'
};

module.exports = authentication;
