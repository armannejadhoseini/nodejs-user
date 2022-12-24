"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const userValidator_1 = __importDefault(require("../validators/userValidator"));
const userController_1 = __importDefault(require("../controllers/userController"));
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.userValidator = new userValidator_1.default();
        this.userController = new userController_1.default();
        this.init();
    }
    init() {
        this.router.post('/signup', this.userValidator.signUpValidator, this.userController.signUp);
        this.router.post('/signin', this.userValidator.signInValidator, this.userController.signIn);
        this.router.post('/signout', this.userValidator.signOutValidator, this.userController.signOut);
        this.router.post('/refresh', this.userValidator.refreshValidator, this.userController.refresh);
    }
    routes() {
        return this.router;
    }
}
module.exports = UserRouter;
