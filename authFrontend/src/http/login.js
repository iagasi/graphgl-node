import { gql } from "@apollo/client";

export const LOGIN=gql`
mutation userLogin($input: UserLogin){
     userLogin(input:$input){
         error,acessToken,refreshToken
     } }
`