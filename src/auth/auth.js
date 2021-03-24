const axios = require("axios");

class AuthClient {

    authorize(req) {
        return axios.post(AuthClient.url + '/authorize', req);
    }

    authenticate(req) {
        return axios.post(AuthClient.url + '/authenticate', req);
    }
}

AuthClient.url = 'localhost:9999';

module.exports = AuthClient;