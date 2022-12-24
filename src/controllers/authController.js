"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const responseHandler_1 = __importDefault(require("../libs/responseHandler"));
const cryptoService_1 = __importDefault(require("../libs/cryptoService"));
const validator_1 = __importDefault(require("validator"));
class AuthController {
    constructor() {
        this.responsehandler = new responseHandler_1.default();
        this.cryptoService = new cryptoService_1.default();
        this.isUserAuthenticated = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers['token'];
            if (!token) {
                res.status(401).json(this.responsehandler.format(401, 'Token Is Required'));
                return;
            }
            const validToken = validator_1.default.isJWT(token);
            if (!validToken) {
                res.status(401).json(this.responsehandler.format(401, 'Token Is Not Valid'));
                return;
            }
            try {
                const userData = yield this.cryptoService.verifyToken(token);
                req.body.email = userData['email'];
                next();
            }
            catch (error) {
                next(error);
            }
        });
    }
}
module.exports = AuthController;
