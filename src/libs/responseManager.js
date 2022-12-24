"use strict";
class ResponseManager {
    format(code, message, data) {
        const response = { code, message, data };
        return response;
    }
}
module.exports = ResponseManager;
