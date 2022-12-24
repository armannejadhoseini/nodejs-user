"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const TokenSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    }
});
const TokenModel = mongoose_1.default.model('token', TokenSchema);
module.exports = TokenModel;
