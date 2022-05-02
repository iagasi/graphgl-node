import jwt from "jsonwebtoken"
import { JWTSECRET } from "../commons"
import { userDb } from "../db/userdb"
import { IUser } from "../interfaces/user"

class TokenService {

    generateTokens(user: any) {
        const { email, loginTimes } = user
        return {
            acessToken: jwt.sign({ email, loginTimes }, JWTSECRET!, { expiresIn: "1m" }),
            refreshToken: jwt.sign({ email, loginTimes }, JWTSECRET!, { expiresIn: "10d" })
        }
    }
    validateToken(token: string | undefined | null) {
        if (token) {
            try{
                const verify = jwt.verify(token, JWTSECRET!)
               return verify
            }
            catch(e){
                return false
            }
        }
        else return false
    }

    guard(acessToken: string | undefined, refreshToken: string) {
        if (!acessToken) {
            throw new Error(" Acess token  Not Present")
        }
        if (!refreshToken) {
            throw new Error(" Refresh token  Not Present")
        }
        if (!this.validateToken(acessToken)) {
            const foundToken = userDb.find(user => user.refreshToken == refreshToken)
           
            
         
            if (!foundToken) { throw new Error("Refresh token not Found") }
            if (!this.validateToken(foundToken?.refreshToken)) {
                throw new Error("Refresh token expired")
            }
            else return true
        }
        else return true
    }
}


export default new TokenService