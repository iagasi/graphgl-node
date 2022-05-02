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
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("@graphql-tools/schema");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const graphSchema_1 = require("./graphSchema");
const userResolvers_1 = require("./routes/userResolvers");
const authMiddleware_1 = __importDefault(require("./middlewarres/authMiddleware"));
const corsConfig = {
    credentials: true,
    origin: "http://localhost:3000",
};
function startApolloServer(typeDefs, resolvers) {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)(corsConfig));
        app.use((0, cookie_parser_1.default)());
        app.set("Access-Control-Allow-Credentials", true);
        app.use(authMiddleware_1.default);
        const httpServer = http_1.default.createServer(app);
        const schema = (0, schema_1.makeExecutableSchema)({ typeDefs, resolvers });
        const server = new apollo_server_express_1.ApolloServer({
            schema,
            context: ({ req, res, next }) => ({ req, res }),
        });
        const io = require("socket.io")(httpServer, {
            cors: {
                origin: "http://localhost:3000"
            }
        });
        io.on("connection", (socket) => {
            console.log("New user is connect");
            socket.on("Registered", (data) => {
                console.log(data);
                console.log("USER REGISTERED");
                io.emit("NewUserRegistered", data);
            });
            socket.on("disconnect", (id) => {
                console.log("disconnected");
            });
        });
        yield server.start();
        server.applyMiddleware({
            app, cors: {
                credentials: true,
                origin: "http://localhost:3000",
                exposedHeaders: ["Set-Cookie", "connection"]
            }
        });
        //
        httpServer.listen(5000, () => console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`));
    });
}
startApolloServer(graphSchema_1.typeDefs, userResolvers_1.resolvers);
//
