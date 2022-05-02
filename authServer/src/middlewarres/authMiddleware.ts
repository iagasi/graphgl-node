import { Request ,Response} from 'express';
import { ICustomRequest } from '../interfaces/user';
import TokenService from '../services/TokenService';


const authMiddleware=(req:ICustomRequest,res:Response,next:any):void=>{
   
        


try{
    const acessToken=req.headers.authorization?.split("Bearer")[1]
const cookie=req.cookies.refreshToken
if(!acessToken||cookie){
    
}


const isAuthorized=TokenService.guard(acessToken,cookie)
   req.ISAUTH=true
}

catch(error){
    
    
req.ISAUTH=false
}
finally{
    next()
    //
 
}
}
//

export default authMiddleware