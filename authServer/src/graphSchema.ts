// import { buildSchema } from "graphql"
import {gql} from "apollo-server"
export const typeDefs = gql` 
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

`



