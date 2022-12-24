"use strict";
class ResponseHandler {
    format(code, message, data) {
        const response = { code, message, data };
        return response;
    }
}
module.exports = ResponseHandler;
