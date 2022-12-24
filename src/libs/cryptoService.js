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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
class CryptoService {
    constructor() {
        this.secret = process.env.JWT_SECRET;
    }
    hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.hash(password, 10);
        });
    }
    verifyPassword(password, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.compare(password, hash);
        });
    }
    signToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            data['id'] = (0, uuid_1.v4)();
            const accessToken = yield jsonwebtoken_1.default.sign(data, this.secret, { expiresIn: '1h' });
            const refreshToken = yield jsonwebtoken_1.default.sign(data, this.secret, { expiresIn: '1y' });
            const token = { accessToken, refreshToken };
            return token;
        });
    }
    verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield jsonwebtoken_1.default.verify(token, this.secret);
            return tokenData;
        });
    }
    refreshToken(data) {
        return __awaiter(this, void 0, void 0, function* () {
            data['id'] = (0, uuid_1.v4)();
            const accessToken = yield jsonwebtoken_1.default.sign(data, this.secret, { expiresIn: '1h' });
            return accessToken;
        });
    }
}
module.exports = CryptoService;
