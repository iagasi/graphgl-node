import { userDb } from "../db/userdb"
import { IContext, IUser } from "../interfaces/user"
import AuthService from "../services/AuthService"
import TokenService from "../services/TokenService"
import UserService from "../services/UserService"



export const resolvers = {

  Query: {
    // getUser: (parent: any, args: any, context: IContext) => {
    //   return UserService.getUserByEmail(args.email)
    // },

    getAllUsers: (parent: any, args: any, context: IContext) => {
      if(context.req.ISAUTH){
              return UserService.getAllUsers()

      }
      

    }
  },
  Mutation: {
    userRegister: async (parent: any, args: any, context: IContext) => {
      const candidate: any = await AuthService.register(args.input,)
      if (!candidate.error) {
        const count = UserService.getAllUsers()
        candidate.usersCount = count
      }
      return candidate

    },
    userLogin: (parent: any, args: any, context: IContext) => {
      
      return AuthService.login(args.input, context)
    }
  },





}