import { userDb } from "../db/userdb"
import * as bcrypt from 'bcrypt'
import { IContext, IUser } from "../interfaces/user";
import TokenService from "./TokenService";
class AuthService {


    async register(input: any) {
        const { password, password2, email } = input
        const user = userDb.find(user => user.email === email)


        if (user) { return { error: "This email already registered" } }
        if (password !== password2) { return { error: "Paswords not Matching" } }
        if (password.length < 6) { return { error: "Pasword length min 6" } }
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        console.log(hashedPassword);
        userDb.push({ email: email, password: hashedPassword, loginTimes: 1, refreshToken: null })
        return { error: null }
    }

    async login(input: any, context: IContext) {
        const { email, password } = input
        const user = userDb.find(user => user.email === email)
        if (!user) {
            return { error: "Email is-not registered" }
        }
        else {
            const compare = await bcrypt.compare(password, user.password)
            
            if (compare) {
                const tokens = TokenService.generateTokens(user)
                user.loginTimes += 1
                user.refreshToken = tokens.refreshToken
                context.res.cookie("refreshToken", tokens.refreshToken, { maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true })
                return {
                    acessToken: tokens.acessToken,
                }
            }
            else return { error: "Password verification error" };
        }
    }




}












export default new AuthService()