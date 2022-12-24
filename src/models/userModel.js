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
const mongoose_1 = __importDefault(require("mongoose"));
const cryptoService_1 = __importDefault(require("../libs/cryptoService"));
const Schema = mongoose_1.default.Schema;
const cryptoService = new cryptoService_1.default();
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});
UserSchema.pre('save', function (done) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isNew) {
            this.password = yield cryptoService.hashPassword(this.password);
        }
        done();
    });
});
const UserModel = mongoose_1.default.model('user', UserSchema);
module.exports = UserModel;
