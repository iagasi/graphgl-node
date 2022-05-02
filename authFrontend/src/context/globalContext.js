import { createContext, useContext, useReducer } from "react"
import { UserReducer } from "./userReducer"

const initialState = {
    email: "",
    loginTimes: 1,
    registeredUsers: 1

}
export const GlobalContext = createContext(initialState)


export const GlobalContextProvider = ({ children }) => {
    const[state,dispatch]=useReducer(UserReducer,initialState)

    return (
        <GlobalContext.Provider value={
            {
                user: state, dispatch,

            }}>

            {children}
        </GlobalContext.Provider>
    )


}

export const UserStateValue = () => useContext(GlobalContext)
