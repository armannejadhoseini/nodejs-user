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
const userModel_1 = __importDefault(require("../models/userModel"));
const tokenModel_1 = __importDefault(require("../models/tokenModel"));
const cryptoService_1 = __importDefault(require("../libs/cryptoService"));
const responseHandler_1 = __importDefault(require("../libs/responseHandler"));
class UserController {
    constructor() {
        this.responseHandler = new responseHandler_1.default();
        this.cryptoService = new cryptoService_1.default();
        this.signUp = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                let user = new userModel_1.default({ email, password });
                user = yield user.save();
                const token = yield this.cryptoService.signToken({ email: user.email });
                res.status(201).json(this.responseHandler.format(201, 'Successfull', token));
            }
            catch (error) {
                next(error);
            }
        });
        this.signIn = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = yield userModel_1.default.findOne({ email: email }, '-_id email password');
                if (!user) {
                    res.status(404).json(this.responseHandler.format(404, 'User Not Found'));
                    return;
                }
                const passwordMatch = yield this.cryptoService.verifyPassword(password, user.password);
                if (!passwordMatch) {
                    res.status(404).json(this.responseHandler.format(401, 'Password Did Not Match'));
                    return;
                }
                const token = yield this.cryptoService.signToken({ email: user.email });
                res.status(200).json(this.responseHandler.format(200, 'Successfull', token));
            }
            catch (error) {
                next(error);
            }
        });
        this.signOut = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { refreshToken } = req.body;
            try {
                const tokenData = yield this.cryptoService.verifyToken(refreshToken);
                let invalidToken = new tokenModel_1.default({ id: tokenData['id'] });
                invalidToken = yield invalidToken.save();
                res.status(200).json(this.responseHandler.format(200, 'Successfull'));
            }
            catch (error) {
                next(error);
            }
        });
        this.refresh = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { refreshToken } = req.body;
            try {
                const tokenData = yield this.cryptoService.verifyToken(refreshToken);
                const isTokenValid = yield tokenModel_1.default.exists({ id: tokenData['id'] });
                if (isTokenValid) {
                    res.status(404).json(this.responseHandler.format(401, 'Refresh Token Is Expired'));
                    return;
                }
                const accessToken = yield this.cryptoService.refreshToken({ email: tokenData['email'] });
                res.status(200).json(this.responseHandler.format(200, 'Successfull', { accessToken }));
            }
            catch (error) {
                next(error);
            }
        });
    }
}
module.exports = UserController;
