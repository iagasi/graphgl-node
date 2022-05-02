export interface IUser {
    input: {
      email: string,
      loginTimes: number,
      password: string,
      password2: string,
      error:string
  
    }
    email: string,
    loginTimes: number,
    password: string,
    password2: string,
    error:string
    acessToken:string

  }


  import { Request ,Response} from 'express';
  export interface IContext{
    req:Request,
    res:Response
  }