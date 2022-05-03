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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const AuthService_1 = __importDefault(require("../services/AuthService"));
const UserService_1 = __importDefault(require("../services/UserService"));
exports.resolvers = {
    Query: {
        // getUser: (parent: any, args: any, context: IContext) => {
        //   return UserService.getUserByEmail(args.email)
        // },
        getAllUsers: (parent, args, context) => {
            if (context.req.ISAUTH) {
                return UserService_1.default.getAllUsers();
            }
            else
                throw new Error("Unathorized!");
        }
    },
    Mutation: {
        userRegister: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const candidate = yield AuthService_1.default.register(args.input);
            if (!candidate.error) {
                const count = UserService_1.default.getAllUsers();
                candidate.usersCount = count;
            }
            return candidate;
        }),
        userLogin: (parent, args, context) => {
            return AuthService_1.default.login(args.input, context);
        }
    },
};
