// lib/request.js
// Small helper to inject the Authorization / X-API-KEY header.

const withAuthHeaders = (z, bundle, extra = {}) => {
    const base = {
        headers: {
            'Accept': 'application/json',
            'x-api-key': bundle.authData.api_key
        }
    };
    return { ...base, ...extra };
};

module.exports = { withAuthHeaders };
