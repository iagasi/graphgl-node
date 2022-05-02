import { gql } from "@apollo/client";

export const REGISTER=gql`
mutation userRegister($input: UserRegister){
     userRegister(input:$input){
         error,email,password,usersCount
     }
    }
`

