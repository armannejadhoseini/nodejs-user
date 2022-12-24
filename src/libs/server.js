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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRouter_1 = __importDefault(require("../routers/userRouter"));
const errorHandler_1 = __importDefault(require("./errorHandler"));
class ServerManager {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT;
        this.mongodbUrl = process.env.DB_URL;
        this.errorHandler = new errorHandler_1.default();
        this.app = (0, express_1.default)();
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(body_parser_1.default.json());
        this.userRouter = new userRouter_1.default();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connectToDB();
            yield this.startServer();
            yield this.setRoutes();
        });
    }
    startServer() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(this.port);
            console.log('Listening On Port :', this.port);
        });
    }
    connectToDB() {
        return __awaiter(this, void 0, void 0, function* () {
            mongoose_1.default.set('strictQuery', false);
            yield mongoose_1.default.connect(this.mongodbUrl);
            console.log('Connected To MongoDB');
        });
    }
    setRoutes() {
        this.app.use('/user', this.userRouter.routes());
        this.app.use(this.errorHandler.handle);
    }
}
module.exports = ServerManager;
