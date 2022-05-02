"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userdb_1 = require("../db/userdb");
class UserService {
    getAllUsers() {
        return userdb_1.userDb.length;
    }
    getUserByEmail(email) {
        return userdb_1.userDb.find((user) => user.email == email);
    }
}
exports.default = new UserService;
