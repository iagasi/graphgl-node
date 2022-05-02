"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TokenService_1 = __importDefault(require("../services/TokenService"));
const authMiddleware = (req, res, next) => {
    var _a;
    try {
        const acessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split("Bearer")[1];
        const cookie = req.cookies.refreshToken;
        if (!acessToken || cookie) {
        }
        const isAuthorized = TokenService_1.default.guard(acessToken, cookie);
        req.ISAUTH = true;
    }
    catch (error) {
        req.ISAUTH = false;
    }
    finally {
        next();
        //
    }
};
//
exports.default = authMiddleware;
