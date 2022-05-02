"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
// import { buildSchema } from "graphql"
const apollo_server_1 = require("apollo-server");
exports.typeDefs = (0, apollo_server_1.gql) ` 
type User{
    id:ID
    email:String
    password:String
    loginTimes:Int
    error:String
    refreshToken:String
    acessToken:String
    usersCount:Int
}
 
input UserRegister{
   
    email:String
    password:String
    password2:String
    loginTimes:Int
    error:String
}
input UserLogin{
    email:String
    password:String
    loginTimes:Int
    error:String
}


type Query{
    getAllUsers:Int
   
    }

type Mutation{
    userRegister(input:UserRegister):User
    userLogin(input:UserLogin):User
}

`;
