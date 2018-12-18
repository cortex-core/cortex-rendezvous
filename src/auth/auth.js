const axios = require("axios");

class AuthClient {

    authorize(req) {
        return axios.post(AuthClient.url + '/authorize', req);
    }
}

AuthClient.url = 'localhost:9999';

module.exports = AuthClient;