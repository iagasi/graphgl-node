"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const commons_1 = require("../commons");
const userdb_1 = require("../db/userdb");
class TokenService {
    generateTokens(user) {
        const { email, loginTimes } = user;
        return {
            acessToken: jsonwebtoken_1.default.sign({ email, loginTimes }, commons_1.JWTSECRET, { expiresIn: "1m" }),
            refreshToken: jsonwebtoken_1.default.sign({ email, loginTimes }, commons_1.JWTSECRET, { expiresIn: "10d" })
        };
    }
    validateToken(token) {
        if (token) {
            try {
                const verify = jsonwebtoken_1.default.verify(token, commons_1.JWTSECRET);
                return verify;
            }
            catch (e) {
                return false;
            }
        }
        else
            return false;
    }
    guard(acessToken, refreshToken) {
        if (!acessToken) {
            throw new Error(" Acess token  Not Present");
        }
        if (!refreshToken) {
            throw new Error(" Refresh token  Not Present");
        }
        if (!this.validateToken(acessToken)) {
            const foundToken = userdb_1.userDb.find(user => user.refreshToken == refreshToken);
            if (!foundToken) {
                throw new Error("Refresh token not Found");
            }
            if (!this.validateToken(foundToken === null || foundToken === void 0 ? void 0 : foundToken.refreshToken)) {
                throw new Error("Refresh token expired");
            }
            else
                return true;
        }
        else
            return true;
    }
}
exports.default = new TokenService;
