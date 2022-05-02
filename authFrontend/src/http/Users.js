import { gql } from "@apollo/client";
export const ONADDUSER=gql`
subscription newUser{
    newUser
    }
`


// export const GETALL=
// gql`query{
//     getAllUsers
  
//     }
// `

export const GETALL=
gql`query {
    getAllUsers
}
`