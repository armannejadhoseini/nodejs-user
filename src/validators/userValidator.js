"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const validator_1 = __importDefault(require("validator"));
const responseHandler_1 = __importDefault(require("../libs/responseHandler"));
class UserValidator {
    constructor() {
        this.responseHandler = new responseHandler_1.default();
        this.signUpValidator = (req, res, next) => {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json(this.responseHandler.format(400, 'Missing A Required Field'));
                return;
            }
            const validEmail = validator_1.default.isEmail(email);
            if (!validEmail) {
                res.status(400).json(this.responseHandler.format(400, 'Email Is Not Valid'));
                return;
            }
            const validPassword = validator_1.default.isStrongPassword(password, { minLenght: 8, minUppercase: 1, minLowercase: 1, minNumber: 1, minSymbol: 1 });
            if (!validPassword) {
                res.status(400).json(this.responseHandler.format(400, 'Password Is Not Valid'));
                return;
            }
            next();
        };
        this.signInValidator = (req, res, next) => {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json(this.responseHandler.format(400, 'Missing A Required Field'));
                return;
            }
            const validEmail = validator_1.default.isEmail(email);
            if (!validEmail) {
                res.status(400).json(this.responseHandler.format(400, 'Email Is Not Valid'));
                return;
            }
            next();
        };
        this.signOutValidator = (req, res, next) => {
        };
        this.refreshValidator = (req, res, next) => {
        };
    }
}
module.exports = UserValidator;
