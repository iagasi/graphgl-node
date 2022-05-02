"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
const userdb_1 = require("../db/userdb");
const bcrypt = __importStar(require("bcrypt"));
const TokenService_1 = __importDefault(require("./TokenService"));
class AuthService {
    register(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, password2, email } = input;
            const user = userdb_1.userDb.find(user => user.email === email);
            if (user) {
                return { error: "This email already registered" };
            }
            if (password !== password2) {
                return { error: "Paswords not Matching" };
            }
            if (password.length < 6) {
                return { error: "Pasword length min 6" };
            }
            var salt = bcrypt.genSaltSync(10);
            const hashedPassword = yield bcrypt.hash(password, salt);
            console.log(hashedPassword);
            userdb_1.userDb.push({ email: email, password: hashedPassword, loginTimes: 1, refreshToken: null });
            return { error: null };
        });
    }
    login(input, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = input;
            const user = userdb_1.userDb.find(user => user.email === email);
            if (!user) {
                return { error: "Email is-not registered" };
            }
            else {
                const compare = yield bcrypt.compare(password, user.password);
                if (compare) {
                    const tokens = TokenService_1.default.generateTokens(user);
                    user.loginTimes += 1;
                    user.refreshToken = tokens.refreshToken;
                    context.res.cookie("refreshToken", tokens.refreshToken, { maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true });
                    return {
                        acessToken: tokens.acessToken,
                    };
                }
                else
                    return { error: "Password verification error" };
            }
        });
    }
}
exports.default = new AuthService();
