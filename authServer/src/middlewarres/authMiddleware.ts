import { Request ,Response} from 'express';
import TokenService from '../services/TokenService';


const authMiddleware=(req:Request,res:Response,next:any):void=>{
   
        


try{
    const acessToken=req.headers.authorization?.split("Bearer")[1]
const cookie=req.cookies.refreshToken
if(!acessToken||cookie){
    
}


const isAuthorized=TokenService.guard(acessToken,cookie)
   req.ISAUTH=true
}

catch(error){
    console.log(error);
    
req.ISAUTH=false
}
finally{
    next()
    //
 
}
}
//

export default authMiddleware