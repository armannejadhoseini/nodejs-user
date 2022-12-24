"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const responseHandler_1 = __importDefault(require("./responseHandler"));
class ErrorHandler {
    constructor() {
        this.responseManager = new responseHandler_1.default();
        this.handle = (err, req, res, next) => {
            console.log(err);
            if (err.code == 11000) {
                res.status(409).json(this.responseManager.format(409, 'User Already Exists'));
                return;
            }
            res.status(500).json(this.responseManager.format(500, 'Internal Server Error'));
            next();
        };
    }
}
module.exports = ErrorHandler;
