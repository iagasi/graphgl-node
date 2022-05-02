import { userDb } from "../db/userdb"

class UserService{

getAllUsers(){
   return userDb.length
}
getUserByEmail(email:string){
    return userDb.find((user) => user.email == email) 
}
}


export  default new  UserService