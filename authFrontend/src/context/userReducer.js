export const UserReducer=(state,action)=>{

   
    switch(action.type){

case "LOGIN":
return{
 ...state,
state:action.payload
}

case "USERS":
    
    return{
        ...state,
        users:action.payload

}
default: return state
}


    }
